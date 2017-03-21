// Lugares disponibles por sector en los hospitales
var mongoose = require('mongoose'),
  	Schema = mongoose.Schema;
      
var Room = new mongoose.Schema({
  hospital:[{type: ObjectId, ref: "hospitals"}]   // ID del hospital de la sala
  name:    {type: String, required: true },  	  // Nombre de la sala
  capacity:{type: Number, default: 0}, 			  // Capacidad máxima de la sala
  availablePlaces:{type: Number, default: 0}, 	  // Plazas/camas disponibles en la sala
  availableSoonPlaces:{type: Number, default: 0}, // Plazas/camas disponibles proximamente en la sala
  reservedPlaces:{type: Number, default: 0}, 	  // Plazas/camas reservadas en la sala
  blockPlaces:{type: Number, default: 0}, 	 	  // Plazas/camas bloqueadas en la sala
  outOfServicePlaces:{type: Number, default: 0},  // Plazas/camas fuera de servicio en la sala
}, {
    collections: 'rooms',
   } 
);

module.exports = mongoose.model('rooms', Room);