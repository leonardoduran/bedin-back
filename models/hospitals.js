var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Hospital = new mongoose.Schema({
  id: {type: Number, default: 0},
  name: { type: String, required: true }
}, {
    collections: 'hospitals',
   } 
);

module.exports = mongoose.model('hospitals', Hospital);