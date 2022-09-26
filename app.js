const express = require('express')
const expressJWT = require('express-jwt')
const cors = require('cors')
const app = express()
const jwtSecretKey = require('./config')

app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(expressJWT({ secret: jwtSecretKey.jwtSecretKey }).unless({ path: [/^\/api\//] }))


//无需验证
const api = require('./route/api')
app.use('/api', api)

//需验证
const admin = require('./route/admin')
app.use('/admin', admin)

app.use(function(err, req, res, next) {
    if (err.name == 'UnauthorizedError') {
        res.send({
            status: 0,
            msg: '身份认证失败'
        })
    }
})

app.listen(5000, () => {
    console.log('http://127.0.0.1:5000');
})