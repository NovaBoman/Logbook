import { NextApiResponse } from 'next';
import UserModel from '../models/UserModel';
import dbConnect from '../utils/mongoose.connect';

export const getAllUsers = async (res: NextApiResponse) => {
  try {
    await dbConnect();
    const users = await UserModel.find({});
    return res.status(200).json(users);
  } catch (e: any) {
    return res.status(500).json(e);
  }
};
