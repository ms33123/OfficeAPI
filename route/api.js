const express = require('express')
const api = express.Router()

const Handler = require('../handler/informationHandler')
const map = require('../handler/mapHandler')
const gywm = require('../handler/gywmHandler')
const cplb = require('../handler/cplbHandler')
const carousel = require('../handler/carouselHandler')

// 基本信息
api.get('/information', Handler.information)

//地图设置
api.get('/map', map.mapData)

//关于我们
api.get('/gywm', gywm.gywm)

//产品列表
api.get('/cplb', cplb.cplbList)

//轮播图
api.get('/getcarousel', carousel.getcarousel)

//登录注册
const login = require('../handler/loginHandler')

//登录
api.post('/login', login.login)

//注册
api.post('/enroll', login.enroll)


const fileHandler = require('../handler/form')
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()

//文件上传
api.post('/upload', multipartMiddleware, fileHandler.file)

module.exports = api