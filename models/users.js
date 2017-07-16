var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

var ObjectId=mongoose.Schema.Types.ObjectId;

var User = new mongoose.Schema({
  name: { type: String, required: true },
  username:{ type: String, required: true, unique: true },
  createdAt: {type: Date, default: Date.now},
  rol: {type: String, default: 'user'}, // financiador / prestador
  hospitalCode:{type: ObjectId, ref: "hospitals"}, // Hospital donde trabaja el usuario si es tipo rol prestador o null
  // osCode:{type: ObjectId, ref: "healthcares"}, // OS donde trabaja el usuario si es tipo rol financiador o null
  provider:{
    type: String,
    // required : 'Provider es obligatorio'
  },
  providerId: String,
  providerData: {}
}, {
    collections: 'users',
   } 
);

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User); 