const express = require('express');
var arts = express.Router();
// 引入数据库表单实例对象 arts
var { Art } = require('../module/arts');
var { Classify, Img, Lam } = require('../module/classify');
const formidable = require('formidable');
const { Photos } = require('../module/photos');
const path = require('path');
const { time } = require('console');
const photos = require('../module/photos');


// 添加文章分类api
arts.post('/classify', async function (req, res) {
    var classOne = await Classify.findOne({ classify_name: req.body.classify_name });
    if (classOne) {
        return res.send({
            status: 400,
            msg: '该分类以存在'
        })
    }
    var data = await Classify.create({
        classify_name: req.body.classify_name,
        color: req.body.color
    })
    res.send({
        status: 200,
        msg: '创建分类成功'
    })
})


// 添加文章api
arts.post('/arts', async function (req, res) {
    var date = new Date();
    console.log(date);
    // 使用req.query接收post请求参数
    var { art_tittle, art_author, art_content, art_taps, art_classify } = req.body;
    var data = await Art.create({
        art_tittle,
        art_author,
        art_content,
        art_taps,
        art_classify,
        art_data: date
    })
    res.send({
        msg: '文章上传成功！',
        status: 200
    });
})

// 查找分类api 创建文章中使用
arts.get('/classify', async function (req, res) {
    var data = await Classify.find();
    res.send({
        data: data,
        status: 200,
        msg: '分类展示成功'
    })
})

// 编辑分类主api
arts.get('/classifyInfo', async function (req, res) {
    var classdata = await Classify.find();
    var classArr = [];
    classdata.forEach(async (item, index) => {
        var artsData = await Art.find({ art_classify: item._id });
        var classObj = {
            classify_name: item.classify_name,
            artsLength: artsData.length,
            classify_id: item._id,
            color: item.color
        }
        classArr.push(classObj);
        if (classdata.length === classArr.length) {
            return res.send(classArr);
        }
    })
})


// 富文本编辑器上传图片api
arts.post('/uploadImage', function (req, res) {
    // 创建formidable实例化对象
    const form = new formidable.IncomingForm();
    // 文件上传路径
    form.uploadDir = path.join('public', 'upload');
    // 保留后缀
    form.keepExtensions = true;
    form.parse(req, async function (err, fields, files) {
        // 上传至数据库
        var data = await Img.create({
            path: files.img.path.split('public')[1]
        })
        res.send({
            path: 'http://47.115.33.123:3000' + data.path,
            status: 200
        });
    })
})

// 删除分类api
arts.delete('/class:id', async function (req, res) {
    var id = req.params.id;
    var data = await Classify.deleteOne({ _id: id });
    var data2 = await Art.deleteMany({ art_classify: id });
    console.log(data);
    console.log(data2);
    if (data.ok !== 0 && data2.ok !== 0) {
        return res.send({
            msg: "删除分类成功",
            status: 200
        })
    }
    else {
        return res.send({
            msg: '删除失败',
            status: 400
        })
    }
})

// 编辑分类api
arts.put('/editClass', async function (req, res) {
    var { className, class_id, color } = req.body;
    var data = await Classify.updateOne({ _id: class_id }, { classify_name: className, color: color });
    if (data.ok === 0) {
        return res.send({
            status: 400,
            msg: '修改分类失败'
        })
    }
    res.send({
        status: 200,
        msg: '修改分类成功'
    });
})


// 文章显示api
arts.get('/allArts', async function (req, res) {
    // sort(属性值:+-1) 1为正序排序 -1为倒序排序
    // 跳转页数
    // 显示页数
    var { pageNum, pageSize } = req.query;
    var allData = await Art.find();
    var total = allData.length;
    var data = await Art.find().populate('art_classify').sort([['_id', -1]]).skip(pageNum * pageSize).limit(parseInt(pageSize));
    res.send({
        data,
        total,
        status: 200
    });
})

// 删除文章api
arts.delete('/delArt:id', async function (req, res) {
    var id = req.params.id;
    var data = await Art.deleteOne({ _id: id });
    if (data.ok === 0) {
        return res.send({
            status: 400,
            msg: '删除失败'
        })
    }
    res.send({
        status: 200,
        msg: '删除成功'
    })
})

// 修改文章api
arts.put('/editArt', async function (req, res) {
    var data = req.body;
    var result = await Art.updateOne({ _id: data.art_id }, {
        art_author: data.art_author,
        art_classify: data.art_classify,
        art_content: data.art_content,
        art_tittle: data.art_tittle,
        art_data: data.art_data,
        art_taps: data.art_taps
    })
    console.log(result);
    if (result.ok === 0) {
        return res.send({
            status: 400,
            msg: '修改失败'
        })
    }
    res.send({
        status: 200,
        msg: '修改成功'
    })
})


// 查看留言接口
arts.get('/lam', async function (req, res) {
    var data = await Lam.find();
    console.log(data);
    res.send({
        data,
        status: 200,
        msg: '成功获取留言信息'
    })
})


// 根据分类或标签查找文章api
arts.get('/pattern', async function (req, res) {
    var arr = [];
    var val = req.query.parameter;
    var data = await Art.find().populate('art_classify');
    for (let i = 0; i < data.length; i++) {
        for (let b = 0; b < data[i].art_taps.length; b++) {
            if (data[i].art_classify.classify_name === val || data[i].art_taps[b] === val) {
                var c = arr.findIndex((item) => {
                    return item === data[i]
                })
                if (c === -1) {
                    arr.push(data[i]);
                }
                else {
                    arr = arr
                }
            }
        }
    }
    res.send(arr)
})

// 根据前端传来文章id查找文章数据
arts.get('/findOne', async function (req, res) {
    var id = req.query.id;
    var data = await Art.findOne({ _id: id }).populate('art_classify');
    console.log(data);
    res.send({
        data: data,
        status: 200,
        msg: '获取文章成功'
    })
})

arts.post('/uploadPhoto', function (req, res) {
    const form = new formidable.IncomingForm();
    // 文件上传路径
    form.uploadDir = path.join('public', 'upload');
    // 保留后缀
    form.keepExtensions = true;
    form.parse(req, async function (err, fields, files) {
        console.log(files.file.path);
        var data = await Photos.create({
            path: files.file.path.split('public')[1],
            introduce: fields.introduce
        })
        res.send({
            status: 200,
            msg: '图片上传成功'
        });
    })
})


arts.get('/photos', async function (req, res) {
    var total = (await Photos.find()).length;
    var { pageNum } = req.query;
    var data = await Photos.find().skip(pageNum * 5).limit(5);
    res.send({
        status: 200,
        data: data,
        total: total
    })
})

arts.delete('/delPhoto', async function (req, res) {
    var data = await Photos.deleteOne({ _id: req.query.id });
    res.send({
        status: 200,
        msg: '删除照片成功'
    });
})

arts.put('/photo', async function (req, res) {
    var { introduce, id } = req.body;
    var data = await Photos.updateOne({ _id: id }, { introduce: introduce });
    res.send({
        status: 200,
        msg: '修改成功'
    })
})


arts.get('/home/photos', async function (req, res) {
    var data = await Photos.find().limit(parseInt(5));
    console.log(data);
    res.send({
        status: 200,
        msg: '获取数据成功',
        data: data
    })
})

// 将arts导出
module.exports = arts;