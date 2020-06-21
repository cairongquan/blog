const mongo = require('mongoose');

// 创建表规则
const arts_schema = mongo.Schema({
    art_tittle: {
        type: String,
        required: true
    },
    art_data: {
        type: String
    },
    art_author: {
        type: String,
        required: true
    },
    art_content: {
        type: String
    },
    art_taps: {
        type: Array
    },
    art_classify: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Classify',
    },
    art_lam: {
        type: Array
    }
})

var Art = mongo.model('Art', arts_schema);

//将Art实例对象导出
module.exports = {
    Art
}
