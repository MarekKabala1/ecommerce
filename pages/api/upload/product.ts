import { NextApiRequest, NextApiResponse } from 'next';
import { ProductFormProps, Product } from '@/components/ProductForm';
// import { PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';


interface Data extends ProductFormProps {
  [x: string]: any;
  message?: string;
  result?: Data;
};
// const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      const data: Data = req.body.data
      if (data === undefined) {
        return undefined
      }
      if (typeof data.price !== 'number' || data.quantity === 'number') {
        throw new Error(typeof data.quantity ? 'Quantity is required' : 'Price is required');
      }

      if ((data?.categoryId === null || data?.categoryId === undefined) &&
        (data?.brandId === null || data?.brandId === undefined)) {
        throw new Error('Error selecting Category or Brand');
      }
      if (!data?.id || data?.id === undefined) {
        throw new Error('Somthing went wrrong try again')
      }

      const result = await prisma.products.create({
        data: {
          id: data.id || '',
          productName: data.productName || '',
          description: data.description || '',
          imageUrl: data.imageUrl || '',
          categoryId: data.categoryId || '',
          brandId: data.brandId || '',
          isArchived: data.isArchived || false,
          isFeatured: data.isFeatured || false,
          price: data.price || 0,
          public_id: data.public_id || '',
          quantity: data.quantity || 1,
        }

      })

      res.status(200).json(result)
    } catch (err) {
      // Handle error and send an error response if needed
      res.status(500).json({ message: 'Error creating product' });
      // res.status(400).json({ message: 'Invalid request method' });

      console.error(err, res.status)
    }
  } else {
    // Send a response for invalid request method
    res.status(400).json({ message: 'Invalid request method' });
  }
}



