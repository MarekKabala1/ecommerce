import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { productData } from '@/components/ProductForm';
import { PrismaClient } from '@prisma/client';

interface Data extends productData {
  message?: string;
  products?: Data
};
type fetchedProducts = {
  id: string;
  proudctName: string;
  description: string;
  imageUrl: string;
  category: string;
  price: number;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const products = await prisma.products.findMany();
    res.status(200).json(products);
  };
}


