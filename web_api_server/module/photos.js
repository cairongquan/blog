const mongo = require('mongoose');

var photo_schema = mongo.Schema({
    path: {
        type: String
    },
    introduce: {
        type: String
    }
})

var Photos = mongo.model('Photos', photo_schema);

module.exports = {
    Photos
}