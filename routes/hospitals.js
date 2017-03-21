var express = require('express');
var router = express.Router();
var Hospital= require('../models/hospitals');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Hospital.find({}).exec((err, result)=>{
  res.send(result);  
  })
});



module.exports = router;