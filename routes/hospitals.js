var express = require('express');
var router = express.Router();
var Hospital= require('../models/hospitals');
var HCP= require('../models/healthcareplans');
var HC= require('../models/healthcares');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Hospital.find({}).exec((err, result)=>{
  res.send(result);  
  })
});

router.post('/new', function(req, res, next) {
   	let aNewHospital=req.body.hospital;
   	console.log(req.body)
    Hospital.create(aNewHospital,function(err,result){
      if(err) console.log(err);
    });

  res.send({ok:"OK!"});  
});

router.post('/newPlan', function(req, res, next) {
   	let aNewPlan=req.body.plan;
   	console.log(req.body)
    HCP.create(aNewPlan,function(err,result){
      if(err) console.log(err);
    });

  res.send({ok:"OK!"});  
});


router.post('/newHealthCare', function(req, res, next) {
    let aHC=req.body.healthCare;
    console.log(aHC)
    HC.create(aHC,function(err,result){
      if(err) console.log(err);
    });

  res.send({ok:"OK!"});  
});

router.get('/healthCare', function(req, res, next) {
  HC.find({}).exec((err, result)=>{
    console.log("Result ", result)
    console.log("Error ",err)    
  res.send(result);  
  })
});

router.get('/healthCarePlans', function(req, res, next) {
  HCP.find({}).exec((err, result)=>{

    console.log("Result ", result)
    console.log("Error ",err)

    res.send(result);  
  })
});

module.exports = router;