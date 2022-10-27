/* eslint-disable indent */
import { MongoServerError } from 'mongoose/node_modules/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import UserModel, { IUser } from '../../models/UserModel';
import ErrorResponse from '../../utils/error.response';
import dbConnect from '../../utils/mongoose.connect';

const register = async (user: IUser): Promise<object> => {
  try {
    await dbConnect();
    const newUser = await UserModel.create(user);
    return newUser;
  } catch (e: any) {
    // "unique" in Mongoose Schema is not a validator, it creates a unique index in MongoDB
    // Trying to insert duplicate data on fields with unique index
    // will result in MongoServerError Duplicate key, 11000.
    // The following code handles this specific error.
    if (e instanceof MongoServerError && e.code === 11000) {
      const substring = 'username';
      const message = e.message.includes(substring)
        ? `A user with this ${substring} already exists`
        : 'A user with this email already exists';
      throw new ErrorResponse(message, 409);
    }
    throw new ErrorResponse(e, 400);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      if (data.roles) {
        return res.status(403).json('Forbidden action');
      }
      await register({ ...req.body });
      return res.status(200).json('User registered');
    } catch (e: any) {
      return e.statusCode
        ? res.status(e.statusCode).json(e.message)
        : res.status(500).json({
            error: e.toString(),
          });
    }
  } else {
    return res.status(400).json('Request method must be POST');
  }
}
