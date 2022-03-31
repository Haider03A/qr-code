const express = require('express')
const router = express.Router()
const { resData } = require('./functons/res_data')
const multer = require('multer')

router.post('/qrcode/upload', resData)

module.exports = router;