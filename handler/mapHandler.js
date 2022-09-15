const db = require('../mysql/index')

//获取地图配置
exports.mapData = (req, res) => {
    const sql = 'select * from map'
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

//更新地图配置
exports.updatemap = (req, res) => {
    const data = req.body
    const sql = 'update map set ? where id = ?'
    db.query(sql, [data, 1], (err, result) => {
        if (err) {
            return res.send({
                status: 0,
                msg: err.message
            });
        }
        if (!data.key || !data.jwd) {
            return res.send({
                status: 0,
                msg: 'Key或经纬度不能为空'
            })
        }
        res.send({
            status: 1,
            msg: '修改成功'
        })
    })
}