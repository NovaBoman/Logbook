// eslint-disable-next-line object-curly-newline
import { models, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  username: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    minlength: [5, 'Username must be between 5 and 10 characters'],
    maxlength: [10, 'Username must be between 5 and 10 characters'],
    match: [
      /^[a-zA-Z0-9]+$/,
      'Username cannot contain special characters or spaces',
    ],
    required: [true, 'Username is required'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [
      // eslint-disable-next-line no-useless-escape
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      'Please enter a valid email address',
    ],
    unique: true,
  },
  password: {
    type: String,
    minlength: [8, 'Password must be between 8 and 20 characters'],
    required: [true, 'Password is required'],
  },
});

// eslint-disable-next-line func-names
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  return next();
});

const UserModel = models.User || model('User', UserSchema);

export default UserModel;
