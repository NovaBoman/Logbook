import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { deleteLog, updateLogById } from '../../../services/log.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  if (req.method === 'DELETE') {
    try {
      if (!token || !token?.user.name) {
        return res.status(401).json('Unauthorized');
      }
      return await deleteLog(req, res, token.user.name);
    } catch (e: any) {
      return res.status(500).json("Couldn't process request");
    }
  }
  if (req.method === 'PATCH') {
    try {
      if (!token || !token?.user.name) {
        return res.status(401).json('Unauthorized');
      }
      return await updateLogById(req, res, token.user.name);
    } catch (e: any) {
      return res.status(500).json("Couldn't process request");
    }
  } else {
    return res.status(400).json('Request method must be DELETE or PATCH');
  }
}
