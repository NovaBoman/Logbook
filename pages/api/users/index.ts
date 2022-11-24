import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { getAllUsers } from '../../../services/user.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  if (req.method === 'GET') {
    try {
      if (!token || !token?.isAdmin) {
        return res.status(401).json('Unauthorized');
      }
      return await getAllUsers(res);
    } catch (e: any) {
      return res.status(500).json("Couldn't process request");
    }
  } else {
    return res.status(400).json('Request method must be GET');
  }
}
