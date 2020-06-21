// 引入mongoose模块
const mongo = require('mongoose');

// 连接数据库
mongo.connect('mongodb://cairongquan:201031@47.115.33.123:28091/Blog?authSource=admin').then(function (result) {
    console.log('数据库连接成功');
}).catch(function (err) {
    console.log(err);
})
