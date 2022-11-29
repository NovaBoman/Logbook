import { NextApiRequest, NextApiResponse } from 'next';
import LogModel, { ILogFields } from '../models/LogModel';
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

export const deleteLog = async (
  req: NextApiRequest,
  res: NextApiResponse,
  username: string
) => {
  try {
    await dbConnect();
    const log = await LogModel.findOneAndDelete({
      _id: req.query.logId,
      user: username,
    });
    return res.status(201).json(log);
  } catch (e: any) {
    console.log(e);
    return res.status(500).json("Couldn't delete log");
  }
};

export const updateLogById = async (
  req: NextApiRequest,
  res: NextApiResponse,
  username: string
) => {
  const fields: ILogFields = { ...req.body };
  const options = { returnDocument: 'after' };
  try {
    await dbConnect();
    const updatedLog = await LogModel.findOneAndUpdate(
      { _id: req.query.logId, user: username },
      fields,
      options
    );
    if (!updatedLog) {
      return res.status(404).json('No log with this Id');
    }
    return res.status(201).json(updatedLog);
  } catch (e) {
    return res.status(500).json('Could not update user');
  }
};

export const getUserLogs = async (
  req: NextApiRequest,
  res: NextApiResponse,
  username: string
) => {
  try {
    await dbConnect();
    const logs = await LogModel.find({ user: username });
    return res.status(201).json(logs);
  } catch (e: any) {
    console.log(e);
    return res.status(500).json("Couldn't get logs");
  }
};
