const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// docSchema defines the structure of our document
const docSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('doc', docSchema);

// then we can use doc methods lik:
// doc.find()
