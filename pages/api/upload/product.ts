import { NextApiRequest, NextApiResponse } from 'next';
import { productData } from '@/components/ProductForm';
import { PrismaClient } from '@prisma/client';


interface Data extends productData {
  message?: string;
  result?: Data;
};
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      const data: Data = req.body.data
      const result = await prisma.products.create({
        data: {
          id: data.id,
          productName: data.productName || '',
          description: data.description || '',
          imageUrl: data.imageUrl || '',
          category: data.category || '',
          price: data.price || 0,
        }
      })
      res.status(200).json(result)

    } catch (err) {
      // Handle error and send an error response if needed
      res.status(500).json({ message: 'Error creating product' });
    }
  } else {
    // Send a response for invalid request method
    res.status(400).json({ message: 'Invalid request method' });
  }
}



