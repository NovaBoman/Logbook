import { NextApiRequest, NextApiResponse } from 'next';
import { logout } from '../../../controllers/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      return await logout(req, res);
    } catch (e: any) {
      return res.status(500).json("Couldn't process request");
    }
  } else {
    return res.status(400).json('Request method must be GET');
  }
}
