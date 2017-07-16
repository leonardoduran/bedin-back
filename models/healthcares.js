// Obras sociales
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ObjectId=mongoose.Schema.Types.ObjectId;

var Healthcares = new mongoose.Schema({
  name: {type: String, required: true},
  email:    {type: String},
  phone:    {type: String},
  plans:    [{type: ObjectId, ref: "healthcareplans"}], // Planes de la OS
  hospitals:[{type: ObjectId, ref: "hospitals"}] // Hospitales con los que trabaja la OS
  
  // hospitalPlans:[{type: ObjectId, ref: "healthcareplans"},
  				 // [{type: ObjectId, ref: "hospitals"}] (Nuevo formato de cómo debe guardarse la info)
  				// ]
}, {
    collections: 'healthcares',
   } 
);

module.exports = mongoose.model('healthcares', Healthcares);