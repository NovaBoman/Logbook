import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { createLog, getUserLogs } from '../../../services/log.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  if (req.method === 'GET') {
    try {
      if (!token || !token?.user.name) {
        return res.status(401).json('Unauthorized');
      }
      return await getUserLogs(req, res, token.user.name);
    } catch (e: any) {
      return res.status(500).json("Couldn't process request");
    }
  }
  if (req.method === 'POST') {
    try {
      if (!token || !token?.user) {
        return res.status(401).json('Unauthorized');
      }
      return await createLog(req, res);
    } catch (e: any) {
      return res.status(500).json("Couldn't process request");
    }
  } else {
    return res.status(400).json('Request method must be POST');
  }
}
