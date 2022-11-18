import { NextApiRequest, NextApiResponse } from 'next';
import { updateUserById } from '../../../services/user.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get user by Id
  if (req.method === 'GET') {
    try {
      return res.status(200).json('GET');
    } catch (e: any) {
      return res.status(500).json("Couldn't process request");
    }
  }
  // Update user by Id
  if (req.method === 'PATCH') {
    try {
      return await updateUserById(req, res);
    } catch (e: any) {
      return res.status(500).json("Couldn't process request");
    }
  }
  // Delete user by Id
  if (req.method === 'DELETE') {
    return res.status(200).json('DELETE');
  }
  return res.status(400).json('Request method must be PATCH');
}
