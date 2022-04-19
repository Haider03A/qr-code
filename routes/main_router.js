const express = require('express')
const router = express.Router()
const { resData } = require('./functons/res_data')


router.post('/qrcode/upload', resData)

module.exports = router;