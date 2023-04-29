const path = require('path')
const {Router} = require('express')
const Form = require('../models/account');

const router = Router();
const multer  = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop())
  }
})

const upload = multer({ storage: storage })
router.post("/upload", upload.single("file"), function (req, res, next) {
  let filedata = req.file;
  if(!filedata)
    return res.status(400).json({message: 'No robit'})
  else
    return res.status(200).json({message: 'robit'})
});

router.get('/load', function(req, res) {
  const img = req.query.img
  const imagePath = path.join("D:", "diplom-app", "server", 'uploads', img);
  res.sendFile(imagePath);
});

module.exports = router


