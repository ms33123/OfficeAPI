//引入数据库
const db = require('../mysql/index')

const sql = 'CREATE TABLE IF NOT EXISTS `information`  (`id` int(0) NULL DEFAULT NULL,`name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,`seo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,`phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,`address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,`Zip` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,`email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,`website` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,`qq` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;'

db.query(sql, (err, result) => {
    if (err) {
        console.log(err.message);
    }
})

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