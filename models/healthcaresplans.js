// Planes de Obras sociales
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// var ObjectId=mongoose.Schema.Types.ObjectId;

var Healthcareplan = new mongoose.Schema({
  name: {type: String, required: true},
}, {
    collections: 'healthcareplans',
   } 
);

module.exports = mongoose.model('healthcareplans', Healthcareplan);