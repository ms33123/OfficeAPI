const db = require('../mysql/index')

const sql = 'CREATE TABLE IF NOT EXISTS `map` (`id` int(0) NULL DEFAULT NULL,`key` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,`name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,`jwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;'

db.query(sql, (err, result) => {
    if (err) {
        console.log(err.message);
    }
})

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
    if (!data.key || !data.jwd) {
        return res.send({
            status: 0,
            msg: 'Key或经纬度不能为空'
        })
    }
    const sql = `update map set ? where id = ?`
    db.query(sql, [data, 1], (err, result) => {
        if (err) {
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