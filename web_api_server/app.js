// 引入express模块
const express = require('express');
// 使用app接受express()实例对象
const app = express();
// 调用数据库连接文件
const mongoose = require('./module/connect');
// 引入arts路由
const arts = require('./router/arts')
// 引入login路由
const admin = require('./router/login');
// 引入主页路由
const home = require('./router/home')
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
// 设置静态文件目录
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 设置跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});



app.use('/arts', arts);
app.use('/admin', admin);
app.use('/home', home);

// 设置服务器开启端口
app.listen(3000, () => {
    console.log('服务器开启成功');
})
