const mongo = require('mongoose');

const classify_schema = mongo.Schema({
    classify_name: {
        type: String
    },
    creatDate: {
        type: Date,
        default: new Date
    },
    color: {
        type: String
    }
})

const imgs_chema = mongo.Schema({
    path: {
        type: String
    }
})

const lam_chema = mongo.Schema({
    username: {
        type: String
    },
    content: {
        type: String
    }
})


var Classify = mongo.model('Classify', classify_schema);
var Img = mongo.model('Img', imgs_chema);
var Lam = mongo.model('Lam', lam_chema);

module.exports = {
    Classify,
    Img,
    Lam
}