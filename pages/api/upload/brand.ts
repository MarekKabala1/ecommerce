import { NextApiRequest, NextApiResponse } from 'next';
import { brandTypes } from '@/components/BrandForm';
// import { PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';


interface Data extends brandTypes {
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
      const result = await prisma.brand.create({
        data: {
          id: data.id || '',
          brandName: data.brandName || '',
          public_id: data.public_id || '',
        }
      })
      res.status(200).json(result)
    } catch (err) {
      const errorResponse: Data = {
        message: 'Error creating brand',
      };
      res.status(500).json(errorResponse);
      console.error(err);
    }
  } else {
    // Send a response for invalid request method
    const errorResponse: Data = {
      message: 'Invalid request method',
    };
    res.status(400).json(errorResponse);
  }
}










