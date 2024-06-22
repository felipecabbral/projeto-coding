const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

let Anime = new Schema ({
    title: {
        type: String
    },
    description: {
        type: String
    },
    year: {
        type: Number
    },
    img: {
        type: String
    },
    genre: {
        type: String
    }

},{
    collection: 'anime'
});

module.exports = mongoose.model('Anime', Anime);