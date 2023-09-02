import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { brandTypes } from '@/components/BrandForm';

interface Data extends brandTypes {
  message?: string;
  brands?: Data[];
}

export interface FetchedCategory {
  id: string
  categoryName: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | FetchedCategory[]>
) {
  if (req.method === 'GET') {
    const categorys = await prisma.category.findMany();
    res.status(200).json(categorys);
  }
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
