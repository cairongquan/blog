# 秋葵日志开发日志

###### 

总体开发模式

<img src="E:\myProgress\new\开发文件素材\Snipaste_2020-06-01_02-17-05.png" alt="Snipaste_2020-06-01_02-17-05" style="zoom: 67%;" />

### 后端开发

#### 默认请求地址(测试) http://localhost:3000/

## 开发:20200602
- 文章标题 api
- 文章发布时间 api
- 文章作者 api 默认本人
- 文章内容 api 富文本编辑器
- 文章标签 api 可自定义

##### 基本文章参数

| **参数名称** | **参数类型**                    | 简述         |
| ------------ | ------------------------------- | ------------ |
| art_tittle   | string                          | 文章标题     |
| art_date     | 默认格式(后期vue过滤器更改格式) | 文章发布日期 |
| art_author   | string                          | 文章作者     |
| art_content  | string                          | 文章内容     |
| art_taps     | array                           | 文章标签     |
| art_classify | string                          | 文章分类     |

##### 文章分类参数

| 参数名称     | 参数类型 | 简述     |
| ------------ | -------- | -------- |
| classify_nam | string   | 分类名称 |

<img src="E:\myProgress\new\开发文件素材\Snipaste_2020-06-03_00-00-41.png" alt="Snipaste_2020-06-03_00-00-41" style="zoom: 50%;" />

- 前端管理员登陆界面绘制完毕 明天完成功能以及创建文章组件
- 基本路由结构代码基本完毕 逻辑功能明天完成
- 文章绑定到了文章分类 文章的表规则已经创建完毕
- vue-cil 脚手架初始化完毕

## 开发：20200603-20200604

- 创建文章api完成
- 富文本上传图片配置完成
- 显示分类api完成
- 登录api完成
- 删除分类api完成 删除分类api会删除所有该分类的文章 

| api地址           | api简介                             | 参数                       | 方式   |
| ----------------- | ----------------------------------- | -------------------------- | ------ |
| admin             | 登录验证                            | null                       | GET    |
| arts/classify     | 添加文章分类                        | null                       | POST   |
| arts/arts         | 添加文章                            | 参数20200605文章参数(必填) | POST   |
| arts/classify     | 创建文章中显示的文章分类选择器数据  | null                       | GET    |
| arts/classifyInfo | 编辑分类显示数据api                 | null                       | GET    |
| arts/uploadImage  | 富文本编辑器点击图片上传地址api     | null                       | POST   |
| arts/class:id     | 删除分类api(会删除该分类下所有文章) | 分类id(填写在url中)        | DELETE |

##### 所有api都将返回status 200为成功 400为失败 错误信息打印在msg中

![Snipaste_2020-06-05_00-54-14](E:\myProgress\new\开发文件素材\Snipaste_2020-06-05_00-54-14.png)

##### 创建文章界面

![Snipaste_2020-06-05_00-54-35](E:\myProgress\new\开发文件素材\Snipaste_2020-06-05_00-54-35.png)

##### 编辑分类界面

