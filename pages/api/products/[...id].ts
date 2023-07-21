import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id?.toString();
  if (req.method === 'GET') {
    try {
      const product = await prisma.products.findUnique({
        where: { id: id },
      });
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching product' })
    }
  }
}
