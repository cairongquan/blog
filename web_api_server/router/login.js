const express = require('express');
const admin = express.Router();


// 登录验证接口
admin.post('/', function (req, res) {
    var { admin_username, admin_password } = req.body;
    if (admin_username !== '蔡荣诠' || admin_password !== 201031) {
        return res.send({
            msg: '帐号或密码错误',
            status: 400
        })
    }
    else {
        return res.send({
            msg: '验证通过',
            status: 200
        })
    }
})


module.exports = admin;