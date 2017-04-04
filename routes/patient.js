var express = require('express');
var router = express.Router();
var RequestPatient= require('../models/requestpatients');
var HC= require('../models/healthcares');
var mongoose = require('mongoose');

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

router.put('/confirm/:requestId/:hospitalId/:userId', function(req, res, next) {
  let reqID=req.params.requestId;
  let hospitalID=req.params.hospitalId;
  let userId=req.params.userId;

  RequestPatient.findOneAndUpdate({_id:reqID},{$set: { state:'Aceptada', hospitalID:hospitalID,responseUser:userId, responseDate:Date.now()}}, {upsert:true}).
  
  exec((err,result) => {
    res.send(result);  
  })

});


router.get('/allRequestAccept/:hospitalId', function(req, res, next) {
  // retorna todas las request aceptadas de pacientes para el hospital recibido por parametro  
  let hospitalID=req.params.hospitalId;
 console.log("paso") 
    RequestPatient.find(
      {$and: [{state:'Aceptada'}, {hospitalID:hospitalID}]})
      .populate('healthCare')
      .populate('healthCarePlan')
      .populate('responseUser')
      .exec((err, result)=>{
        res.send(result);  
      })
});


router.get('/allRequestGen/:hospitalId', function(req, res, next) {
  // retorna todas las request de pacientes para el hospital recibido por parametro
  
  let hospitalID=req.params.hospitalId;
//   console.log("Request del hospital "+hospitalID)

// console.log(req.isAuthenticated())
console.log(req.user)

// RequestPatient.find({hospitalID:hospitalID}).populate('healthCare').populate('healthCarePlan').exec((err, result)=>{
  
    RequestPatient.find(
      {$and: [{state:'Generada'},
              {$or: [ {hospitalID:hospitalID}, {hospitalID:mongoose.Schema.Types.ObjectId('')}]}
             ]
      }
      
      ).populate('healthCare').populate('healthCarePlan').exec((err, result)=>{
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
	HC.find({"_id":osId}).populate('plans').populate('hospitals').exec((err, result)=>{
  		res.send(result);  
  	})
});

module.exports = router;