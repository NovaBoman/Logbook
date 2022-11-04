import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
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

export const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json('Request body must contain username and password');
  }
  try {
    await dbConnect();
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json('User not found');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json('Invalid password');
    }
    return res.status(200).json('Logged in');
  } catch (e: any) {
    return res.status(500).json('Could not sign in');
  }
};
