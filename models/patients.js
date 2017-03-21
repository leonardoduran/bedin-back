var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ObjectId=mongoose.Schema.Types.ObjectId;

var Patient = new mongoose.Schema({
  firstname: {type: String, required: true},
  lastname:  {type: String, required: true},
  birthdate: {type: Date},
  email:     {type: String},
  phone:     {type: String},
  healthcare:{type: ObjectId, ref: "healthCare"}, // Obra social del paciente
  plan:      {type: ObjectId, ref: "healthCarePlans"} // Plan de la OS
}, {
    collections: 'patients',
   } 
);

module.exports = mongoose.model('patients', Patient);