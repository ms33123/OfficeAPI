//引入数据库
const db = require('../mysql/index')

//获取基本信息的方法
exports.information = (req, res) => {
    const sql = 'select * from information'
    db.query(sql, (err, result) => {
        if (err) {
            return res.send({
                status: 0,
                msg: err.message
            });
        }
        res.send({
            status: 1,
            msg: '获取列表成功',
            data: result
        })
    })
}

//修改基本信息
exports.update = (req, res) => {
    const data = req.body
    const sql = 'update information set ? where id = ?'
    db.query(sql, [data, 1], (err, result) => {
        if (err) {
            return res.send({
                status: 0,
                msg: err.message
            });
        }
        if (!data.name) {
            return res.send({
                status: 0,
                msg: '网站名称不能为空'
            })
        }
        res.send({
            status: 1,
            msg: '修改成功'
        })
    })
}