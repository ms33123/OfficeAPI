const fs = require('fs')
const path = require('path')
exports.file = (req, res) => {
    //文件对象信息
    const files = req.file.avatar
    console.log(files);
    //获取文件临时存放位置
    const imgpath = files.path

    const fileReader = fs.createReadStream(imgpath)
    var filesDir = path.join(__dirname, '../uploads')
    const filePath = `${fileDir}/aaaaa.png`

    const fileWrite = fs.createWriteStream(filePath)
    fileReader.pipe(fileWrite)
    res.send({
        msg: "success"
    })
}