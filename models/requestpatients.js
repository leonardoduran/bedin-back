var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// Solicitudes de los pacientes para reserva de Cama / 
var ObjectId=mongoose.Schema.Types.ObjectId;

var RequestPatients = new mongoose.Schema({
  origin   : { type: String}, // La solicitud puede venir de un (A)mbulanciero o de un (P)aciente
  originId : { type: ObjectId}, // ID del paciente o del ambulanciero que realizó la solicitud
  patientId: { type: ObjectId, ref: "patients"}, // ID del paciente 
  pathology: { type: String}, // Patologías que presenta el paciente
  inputDate: {type: Date, default: Date.now}, // Fecha que se generó la solicitud
  priority : { type: Number}, // Prioridad según criterio (de 1 a 5?)
  hospitalID:{ type: ObjectId, ref: "hospital"}, // ID del hospital al que se le hizo la soilicitud
  state     :{ type:String, default:"Generada"}, // Estado en el que se encuentra la solicitud (Generada / Aceptada / Rechazada)
  responseDate: {type: Date}, // Fecha en la que se respondió a la soliciud
  responseUser:{ type: ObjectId, ref: "users"} // ID del usuario que respondió la siolicitud
}, {
    collections: 'request',
   } 
);

module.exports = mongoose.model('request', RequestPatients);