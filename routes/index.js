var express = require('express');
var router = express.Router();
const User = require('../models/users');
const HealthCare = require('../models/healthcares');
const HealthCarePlans = require('../models/healthcareplans');
// const HCP = require('../models/hospitals');

const addUser = (req, res, next) => {
  User.create({
    username: req.body.user.userName,
    name: req.body.user.name,
  }, (err, result) => {
    if (!err) {
      result.password = req.body.user.password
      result.save( (err, result) => {
        req.user=result;
        next();
      });
    }else{
      res.send({error:true, msj:'Fallo el alta de usuario: '+err});
    }
  })
};

const validNewUser = (req, res, next) => {
  if (req.body.user.password !== req.body.user.password2) {
    res.send({error:true, msj:'Las password no coinciden'});
  } else {
    User.findOne({ username: req.body.user.userName }, (err, result) => {
      if (err || !result) {      
        next();
      } else {
        res.send({error:true,msj:'Usuario ya registrado'});
      }
    });
  }
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.post('/register', validNewUser, addUser, function(req, res, next) {
//   res.send({msj:"Usuario registrado"});
// });

router.post('/register',function(req, res, next) {
  User.register(new User({username: req.body.user.userName, name:req.body.user.name, hospitalCode:req.body.user.hospitalCode}), req.body.user.password, function(err) {
    if (err) {
      console.log('error while user register!',err.name);
      return res.send({error:true,msj:err.name})
      // return next(err);

    }
    res.send({msj:"Usuario registrado"});
    // res.redirect('/');
  });
});

router.get('/healthCare', function(req, res, next) {
  HealthCare.find({}).exec((err, result)=>{
    console.log("Result ", result)
    console.log("Error ",err)    
  res.send(result);  
  })
});

router.get('/healthCarePlans', function(req, res, next) {
  HealthCarePlans.find({}).exec((err, result)=>{

    console.log("Result ", result)
    console.log("Error ",err)

    res.send(result);  
  })
});

module.exports = router;
