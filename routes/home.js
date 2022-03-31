const express = require('express')
const router = express.Router()
const multer = require('multer')


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

let prossCount = 0;

router.get('/', (req, res) => {
  res.render('index', {
    prossCount
  })
})

router.post('/', upload.single('file'), (req, res) => {
  console.log(req.file)
  prossCount++
})

router.post('/a', (req, res) => {
  console.log(req.body)
  res.json(req.body)
})

router.post('/qrcode/upload', (req, res) => {
  if (req.body[0].qrcodeData) {
    res.status(200)
    res.json(req.body);
  } else {
    res.status(404)
    res.json({
      error: 'no body'
    });
  }
})

module.exports = router;