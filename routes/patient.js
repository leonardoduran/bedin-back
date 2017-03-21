var express = require('express');
var router = express.Router();
var RequestPatient= require('../models/requestpatients');
var HC= require('../models/healthcares');


router.post('/addRequest', function(req, res, next) {
   	let aReqPatient=req.body.requestPatient;
    RequestPatient.create(aReqPatient,function(err,result){
      if(err) console.log(err);
    });

  res.send({ok:"OK!"});  
});



router.get('/allRequest', function(req, res, next) {
  // retorna todas las request de pacientes para todos los hospitales
  // RequestPatient.find({}).exec((err, result)=>{
  // res.send(result);  
	RequestPatient.find({}).populate('healthCare').populate('healthCarePlan').exec((err, result)=>{
  		res.send(result);  
  	})
});

	// Post.findOne({_id: req.idPost}).populate('author comments').exec((err, result)=>{
	// 	if (!err) {
	// 	  req.post=result
	//    	  next();	
	// 	}else {
 //   		  res.send({error: true, msj:'Error al recuperar el post'});
	// 	}
	// })


router.get('/allRequest/:hospitalId', function(req, res, next) {
  // retorna todas las request de pacientes para el hospital recibido por parametro
  let hospitalID=req.params.hospitalId;
  console.log("Request del hospital "+hospitalID)
  RequestPatient.find({hospitalID:hospitalID}).populate('healthCare').populate('healthCarePlan').exec((err, result)=>{
  res.send(result);  
  })
});

router.get('/request/:requestId', function(req, res, next) {
  // retorna la request recibida por parametro
  let requestId=req.params.requestId;
  RequestPatient.findById({requestId}).exec((err, result)=>{
  res.send(result);  
  })
});


router.get('/formadd/:healthCareId', function(req, res, next) {
	let osId=req.params.healthCareId
	HC.find({"_id":osId}).populate('plans').exec((err, result)=>{
  		res.send(result);  
  	})
});

module.exports = router;