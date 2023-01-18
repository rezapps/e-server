const express = require( 'express' );
const mongoose = require('mongoose');

const cors = require( 'cors' );
const http = require( 'http' );
const socketIO = require( 'socket.io' );
const PORT = 5000;
const docRoutes = require( './routes/route' );


const app = express();
// Middleware
app.use( express.json() );

app.use( cors() );

app.use( express.urlencoded( { extended: false } ) );

app.use( '/api/docs', docRoutes );

// Server instance
const server = http.createServer( app )

// Creates socket using the instance of the server
const io = socketIO( server, {
    cors: {
        // Port number for frontend
        origin: "http://localhost:8000"
    }
} )

// Socket.io on Connection
io.on( 'connection', socket =>
{
    console.log( 'User connected', socket.id )

    socket.join( 'farting' )

    socket.on( 'disconnect', ( reason ) =>
    {
        console.log( 'user disconnected', reason )
    } )
} )


setInterval( () =>
{
    io.to( 'clock-room' ).emit( 'time', new Date() )
}, 1000 )


mongoose.connect("mongodb+srv://rere20:2'Zz;k&'7S+3p2MG@cluster0.2iv0s7j.mongodb.net/textEditor")
    .then(() => {
        server.listen(PORT, () => {
            console.log(`server is running on PORT: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error);
    });
