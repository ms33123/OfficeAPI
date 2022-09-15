const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//无需验证
const api = require('./route/api')
app.use('/api', api)

//需验证
const admin = require('./route/admin')
app.use('/admin', admin)

app.listen(5000, () => {
    console.log('http://127.0.0.1:5000');
})