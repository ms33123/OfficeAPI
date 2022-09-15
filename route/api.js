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

module.exports = api