import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { getUserLogs } from '../../../services/log.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  if (req.method === 'GET') {
    try {
      if (!token || !token?.user) {
        return res.status(401).json('Unauthorized');
      }
      return await getUserLogs(req, res);
    } catch (e: any) {
      return res.status(500).json("Couldn't process request");
    }
  } else {
    return res.status(400).json('Request method must be GET');
  }
}
