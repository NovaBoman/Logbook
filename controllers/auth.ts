/* eslint-disable import/prefer-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '../models/UserModel';
import dbConnect from '../utils/mongoose.connect';

export const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body.roles) {
    return res.status(403).json('Forbidden action');
  }
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json('Request body must include username, email and password');
  }
  try {
    await dbConnect();
    await UserModel.create({ ...req.body });
    return res.status(201).json('User created');
  } catch (e: any) {
    // "unique" in Mongoose Schema is not a validator, it creates a unique index in MongoDB
    // Trying to insert duplicate data on fields with unique index
    // will result in MongoServerError Duplicate key, 11000.
    // The following code handles this specific error.
    if (e.code === 11000) {
      const substring = 'username';
      const message = e.message.includes(substring)
        ? `A user with this ${substring} already exists`
        : 'A user with this email already exists';
      return res.status(409).json(message);
    }
    return res.status(500).json("Couldn't create user");
  }
};
