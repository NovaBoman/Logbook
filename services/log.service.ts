import { NextApiRequest, NextApiResponse } from 'next';
import LogModel from '../models/LogModel';
import dbConnect from '../utils/mongoose.connect';

export const createLog = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();
    const log = await LogModel.create({ ...req.body });
    return res.status(201).json(log);
  } catch (e: any) {
    console.log(e);
    return res.status(500).json("Couldn't create log");
  }
};
