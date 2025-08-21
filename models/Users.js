const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    maxlength: 255
  },
  phone: {
    type: String,
    maxlength: 20
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, 
  collection: 'Users'
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
