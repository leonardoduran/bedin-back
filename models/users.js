var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

var ObjectId=mongoose.Schema.Types.ObjectId;

var User = new mongoose.Schema({
  name: { type: String, required: true },
  username:{ type: String, required: true, unique: true },
  createdAt: {type: Date, default: Date.now},
  rol: {type: String, default: "user"},
  hospitalCode:{type: ObjectId, ref: "hospitals"}, // Hospitales con los que trabaja la OS
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