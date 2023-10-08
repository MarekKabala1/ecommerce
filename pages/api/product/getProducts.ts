import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

interface Data {
  message?: string;
  products?: Data[];
}

export type fetchedProduct = {
  id: string;
  description: string;
  price: number;
  imageUrl: string;
  productName: string;
  quantity: number;
  isFeatured: boolean;
  isArchived: boolean;
  public_id: string;
  categoryId: string | null;
  brandId: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | fetchedProduct[]>
) {
  if (req.method === 'GET') {
    const products = await prisma.products.findMany();
    res.status(200).json(products);
  }
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
