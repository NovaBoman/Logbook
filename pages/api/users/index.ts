import { NextApiRequest, NextApiResponse } from 'next';
import { getAllUsers } from '../../../services/user.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      return await getAllUsers(res);
    } catch (e: any) {
      return res.status(500).json("Couldn't process request");
    }
  } else {
    return res.status(400).json('Request method must be GET');
  }
}
