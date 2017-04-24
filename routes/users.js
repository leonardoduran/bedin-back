var express = require('express');
var router = express.Router();
var passport = require('passport')
var Hospital= require('../models/hospitals');
const User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.send({msj: "Error", err}) }
    if (!user) {
      // *** Display message without using flash option
      // re-render the login form with a message
      
      // return res.send({msj: info.message })
      return res.send({error:true, msj: 'Usuario o password incorrectos'});
    }
    req.logIn(user, function(err) {
      if (err) { return res.send({msj: "Error", err}); }
console.log("Autenticado (Login): ",req.isAuthenticated())
// console.log("User: ",req.user)
      Hospital.findOne({_id:user.hospitalCode})
        .exec((err, result)=>{
          if (!err) {
            // res.user.hospitalDesc=result.name;
            let hospital =result.name;
// console.log("usuario", user)
            return res.send({msj: "Usuario logueado correctamente", user,hospital});
            // next(); 
          }else {
            res.send({error: true, msj:'Error al recuperar el hospital'});
        }
      })
      // return res.end({msj: "Usuario logueado correctamente", user});
    });
  })(req, res, next);
});


router.get('/logout', function(req, res) {
  req.logout();
  res.send({msj: "Usuario deslogueado"});
});


router.post('/register',function(req, res, next) {
  User.register(new User(
    { username: req.body.user.userName, 
      name:req.body.user.name, 
      hospitalCode:req.body.user.hospitalCode}), 
      req.body.user.password, 
    function(err) {
    if (err) {
      console.log('error while user register!',err.name);
      return res.send({error:true,msj:err.name})
      // return next(err);

    }

    res.send({error: false, msj:"Usuario registrado"});
    // res.redirect('/');
  })
});

module.exports = router;