const express = require('express')
const admin = express.Router()

const Handler = require('../handler/informationHandler')

//修改基本信息
admin.post('/update', Handler.update)

const map = require('../handler/mapHandler')

//修改地图设置
admin.post('/updatemap', map.updatemap)

//修改关于我们
const gywm = require('../handler/gywmHandler')
admin.post('/updategywm', gywm.updateGywm)

//修改产品
const cplb = require('../handler/cplbHandler')
admin.post('/updatecplb/:id', cplb.update)

//删除产品
admin.post('/delete/:id', cplb.delete)

//添加产品
admin.post('/add', cplb.add)

const carousel = require('../handler/carouselHandler')

//添加轮播图
admin.post('/addcarousel', carousel.addcarousel)

//删除轮播图
admin.post('/detelecarousel/:id', carousel.detelecarousel)

//修改轮播
admin.post('/updatecarousel', carousel.updatecarousel)

module.exports = admin