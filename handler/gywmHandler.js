//引入数据库
const db = require('../mysql/index')

exports.gywm = (req, res) => {
    const sql = 'select content from gywm'
    db.query(sql, (err, result) => {
        if (err) {
            return res.send({
                status: 0,
                msg: err.message
            });
        }
        res.send({
            status: 1,
            msg: '获取成功',
            data: result
        })
    })
}

exports.updateGywm = (req, res) => {
    const data = req.body
    const sql = 'update gywm set ? where id = ?'
    db.query(sql, [data, 1], (err, result) => {
        if (err) {
            return res.send({
                status: 0,
                msg: err.message
            });
        }
        if (!data.content) {
            return res.send({
                status: 0,
                msg: '内容不能为空'
            })
        }
        res.send({
            status: 1,
            msg: '修改成功'
        })
    })
}