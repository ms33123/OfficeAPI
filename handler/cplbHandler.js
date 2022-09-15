//引入数据库
const db = require('../mysql/index')

//产品列表
exports.cplbList = (req, res) => {
    const sql = 'select * from cplb'
    db.query(sql, (err, result) => {
        if (err) {
            return res.send({
                status: 0,
                msg: err.message
            });
        }
        res.send({
            status: '1',
            msg: '获取列表成功',
            data: result
        })
    })
}

//修改产品
exports.update = (req, res) => {
    const data = req.body
    if (!data.content || !data.name) {
        return res.send({
            status: 0,
            msg: '内容或产品名称不能为空'
        })
    }
    const sql = 'update cplb set ? where id = ?'
    db.query(sql, [data, req.params.id], (err, result) => {
        if (err) {
            console.log(err.message)
            return res.send({
                status: 0,
                msg: err.message
            });
        }
        res.send({
            status: 1,
            msg: '修改成功'
        })
    })
}

//删除产品
exports.delete = (req, res) => {
    const sql = 'UPDATE cplb SET `show` = 0 WHERE id = ?'
    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            return res.send({
                status: 0,
                msg: err.message
            });
        }
        res.send({
            status: 1,
            msg: '删除产品成功'
        })
    })
}

//添加产品
exports.add = (req, res) => {
    const data = req.body
    if (!data.name || !data.time || !data.content) {
        return res.send({
            status: 0,
            msg: '请填写完整内容'
        })
    }
    const sql = 'insert into cplb(name,time,content) values(?,?,?)'
    db.query(sql, [data.name, data.time, data.content], (err, result) => {
        if (err) {
            return res.send({
                status: 0,
                msg: err.message
            })
        }
        res.send({
            status: 1,
            msg: '添加成功'
        })
    })
}