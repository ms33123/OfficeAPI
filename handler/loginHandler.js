//引入数据库
const db = require('../mysql/index')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const jwtSecretKey = require('../config')

const sql = 'CREATE TABLE IF NOT EXISTS `users`  (`id` int(0) NOT NULL AUTO_INCREMENT,`username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,`password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,`permissions` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,`nick` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,PRIMARY KEY (`id`) USING BTREE) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;'

db.query(sql, (err, result) => {
    if (err) {
        console.log(err.message);
    }
})


//登录
exports.login = (req, res) => {
    const data = req.body;
    const sql = 'select * from users where username = ?'
    db.query(sql, data.username, (err, result) => {
        // 执行 SQL 语句失败
        if (err) return res.send({ status: 1, message: err.message })
            //用户名不存在
        if (result.length == 0) {
            return res.send({
                status: 0,
                msg: '用户名不存在'
            })
        }
        //用户名存在
        // 拿着用户输入的密码,和数据库中存储的密码进行对比
        const compareResult = bcrypt.compareSync(data.password, result[0].password)

        if (!compareResult) {
            return res.send({
                status: 0,
                msg: '登录失败'
            })
        }
        //存储token信息
        const user = {...result[0], password: '' }
        const tokenStr = jwt.sign(user, jwtSecretKey.jwtSecretKey, { expiresIn: '10h' })
        res.send({
            status: 1,
            msg: '登录成功',
            token: 'Bearer ' + tokenStr
        })

    })
}

//注册
exports.enroll = (req, res) => {
    const data = req.body;
    if (!data.username || !data.password || !data.nick) {
        return res.send({
            status: 0,
            msg: '请填写完整信息'
        })
    }

    //检测用户名
    const sql1 = 'select * from users where username = ?'
    db.query(sql1, data.username, (err, result) => {
        // 执行 SQL 语句失败
        if (err) return res.send({ status: 1, message: err.message })

        if (result.length > 0) {
            return res.send({
                status: 0,
                msg: '用户名被占用，请更换其他用户名'
            })
        }

        //注册
        //密码加密
        data.password = bcrypt.hashSync(data.password, 10)
        const sql = 'insert into users set ?'
        db.query(sql, data, (err, result) => {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
                // SQL 语句执行成功，但影响行数不为 1
            if (result.affectedRows !== 1) {
                return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
            }
            res.send({
                ststus: 1,
                msg: '注册成功'
            })
        })
    })
}