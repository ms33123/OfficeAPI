//引入数据库
const db = require('../mysql/index')

const sql = 'CREATE TABLE IF NOT EXISTS `gywm` (`id` int(0) NOT NULL,`content` varchar(2550) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,PRIMARY KEY (`id`) USING BTREE) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;'

db.query(sql, (err, result) => {
    if (err) {
        console.log(err.message);
    }
})

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