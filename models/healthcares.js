// Obras sociales
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ObjectId=mongoose.Schema.Types.ObjectId;

var HealthCares = new mongoose.Schema({
  name: {type: String, required: true},
  email:    {type: String},
  phone:    {type: String},
  plans:    [{type: ObjectId, ref: "healthCarePlans"}], // Planes de la OS
  hospitals:[{type: ObjectId, ref: "hospitals"}] // Hospitales con los que trabaja la OS
}, {
    collections: 'healthcare',
   } 
);

module.exports = mongoose.model('healthcare', HealthCares);
