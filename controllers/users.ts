import { NextApiRequest, NextApiResponse } from 'next';
import UserModel, { IUser, IUserFields } from '../models/UserModel';
import dbConnect from '../utils/mongoose.connect';

export const getAllUsers = async (res: NextApiResponse) => {
  try {
    await dbConnect();
    const users: IUser[] = await UserModel.find({});
    return res.status(200).json(users);
  } catch (e: any) {
    return res.status(500).json(e);
  }
};

export const updateUserById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const fields: IUserFields = { ...req.body };
  const options = { returnDocument: 'after' };
  try {
    await dbConnect();
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.query.userId },
      fields,
      options
    );
    if (!updatedUser) {
      return res.status(404).json('No User with this Id');
    }
    return res.status(201).json(updatedUser);
  } catch (e) {
    return res.status(500).json('Could not update user');
  }
};
