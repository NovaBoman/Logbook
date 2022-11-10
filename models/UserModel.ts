/* eslint-disable func-names */
/* eslint-disable no-useless-escape */
/* eslint-disable prefer-arrow-callback */
// eslint-disable-next-line object-curly-newline
import { models, model, Schema, ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  roles?: string[];
}

export interface IUserFields {
  username?: string;
  email?: string;
  password?: string;
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
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      'Please enter a valid email address',
    ],
    unique: true,
  },
  password: {
    type: String,
    minlength: [8, 'Password must be a minimum of 8 characters'],
    required: [true, 'Password is required'],
  },
  roles: {
    type: [String],
    default: ['user'],
  },
});

// Hashes password when saving new users (Mongoose Document middleware)
UserSchema.pre(['save'], async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  return next();
});

// Hashes updated passwords (Mongoose Query middleware)
UserSchema.pre('findOneAndUpdate', async function (next) {
  let pwd = this.get('password');
  if (!pwd) {
    return next();
  }
  pwd = bcrypt.hashSync(pwd, 10);

  this.set('password', pwd);
  return next();
});

const UserModel = models.User || model('User', UserSchema);

export default UserModel;
