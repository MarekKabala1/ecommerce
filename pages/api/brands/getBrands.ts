import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { brandTypes } from '@/components/BrandForm';

interface Data extends brandTypes {
  message?: string;
  brands?: Data[];
}

export interface FetchedBrand {
  id: string
  brandName: string
  public_id?: string | null
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | FetchedBrand[]>
) {
  if (req.method === 'GET') {
    const brands = await prisma.brand.findMany();
    res.status(200).json(brands);
  }
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
