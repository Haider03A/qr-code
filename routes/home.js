const express = require('express')
const router = express.Router()
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

router.get('/', (req, res) => {
    res.render('index')
})

router.post('/', upload.single('file'), (req, res) => {
 console.log(req.file)
})

module.exports = router;