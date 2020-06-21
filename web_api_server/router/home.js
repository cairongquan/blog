const express = require('express');
var home = express.Router();
const { Art } = require('../module/arts');
const { Lam } = require('../module/classify');

// 主页获取最新文章接口
home.get('/home', async function (req, res) {
    var data = await Art.find().sort([['_id', -1]]).limit(5).populate('art_classify');
    res.send({
        status: 200,
        data
    })
})

// 主页标签展示接口
home.get('/class', async function (req, res) {
    var data = await Art.find();
    arr = [];
    for (let i = 0; i < data.length; i++) {
        for (let b = 0; b < data[i].art_taps.length; b++) {
            // 标签去重
            var s = arr.findIndex((item) => {
                return item === data[i].art_taps[b];
            })
            if (s === -1) {
                arr.push(data[i].art_taps[b]);
            }
            else {
                arr = arr;
            }
        }
    }
    res.send({
        status: 200,
        data: arr
    });
})

// 留言接口
home.post('/lam', async function (req, res) {
    var data = await Lam.create({
        username: req.body.username,
        content: req.body.content
    })
    if (!data) {
        return res.send({
            status: 400,
            msg: '留言失败'
        })
    }
    res.send({
        status: 200,
        msg: '留言成功'
    })
})

home.put('/uploadArtLam', async function (req, res) {
    var data = await Art.findOne({ _id: req.body.art_id });
    var arr = data.art_lam;
    arr.push({
        useful: req.body.data.usefull,
        username: req.body.data.username,
        content: req.body.data.content
    })
    var result = await Art.updateOne({ _id: req.body.art_id }, { art_lam: arr });
    res.send({
        status: 200,
        msg: '上传成功'
    })
})

module.exports = home;