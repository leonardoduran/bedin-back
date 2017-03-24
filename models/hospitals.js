var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Hospital = new mongoose.Schema({
  name: { type: String, required: true }
}, {
    collections: 'hospitals',
   } 
);

module.exports = mongoose.model('hospitals', Hospital);