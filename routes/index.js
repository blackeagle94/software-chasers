var express = require('express');
var router = express.Router();
const fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ismail' });
});

router.post('/', (req, res) => {
  if(req.files) {
    const file = req.files.images
    const filename = file.name
    
    file.mv('./uploads/' + filename, err => {
      if(err) {
        res.send(err)
      } else {
        res.send('File Uploaded')
      }
    })
  }
})

router.delete('/', (req, res) => {
  fs.unlinkSync('./uploads/' + req.body.name)
  res.send('Successfully Removed')
})

module.exports = router;
