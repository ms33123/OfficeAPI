//引入数据库
const db = require('../mysql/index')


exports.getcarousel = (req, res) => {
    const sql = 'select * from imgurl'
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

//添加轮播图
exports.addcarousel = (req, res) => {
    const data = req.body;
    if (!data.name || !data.imgurl) {
        return res.send({
            status: 0,
            msg: '请填写完整信息'
        })
    }
    const sql = 'insert into imgurl(name,imgurl) values(?,?)'
    db.query(sql, [data.name, data.imgurl], (err, result) => {
        if (err) {
            return res.send({
                status: 0,
                msg: err.message
            });
        }
        res.send({
            status: 1,
            msg: '添加成功'
        })
    })
}

//删除轮播图
exports.detelecarousel = (req, res) => {
    const sql = 'delete from imgurl where `id` = ?'
    db.query(sql, req.params.id, (err, result) => {
        if (err) {
            return res.send({
                status: 0,
                msg: err.message
            })
        }
        res.send({
            status: 1,
            msg: '删除成功'
        })
    })
}

//修改轮播
exports.updatecarousel = (req, res) => {
    const data = req.body;
    if (!data.name || !data.imgurl || !data.id) {
        return res.send({
            status: 0,
            msg: '缺少参数'
        })
    }
    const sql = 'update imgurl set ? where id = ?'
    db.query(sql, [data, data.id], (err, result) => {
        if (err) {
            return res.send({
                status: 0,
                msg: err.message
            })
        }
        res.send({
            status: 1,
            msg: '修改成功'
        })
    })
}