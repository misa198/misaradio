import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  verified: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model('User', UserSchema);
