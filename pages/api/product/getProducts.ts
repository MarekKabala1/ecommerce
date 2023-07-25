import { NextApiRequest, NextApiResponse } from 'next';
import { productData } from '@/components/ProductForm';
import prisma from '@/lib/prisma';

interface Data extends productData {
  message?: string;
  products?: Data[];
}

type fetchedProduct = {
  id: string;
  productName: string;
  description: string;
  imageUrl: string;
  category: string;
  price: number;
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
