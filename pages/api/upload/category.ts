import { NextApiRequest, NextApiResponse } from 'next';
import { categoryTypes } from '@/components/CategoryForm';
// import { PrismaClient } from '@prisma/client';
import prisma from '@/lib/prisma';


interface Data extends categoryTypes {
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
      const result = await prisma.category.create({
        data: {
          id: data.id || '',
          categoryName: data.categoryName || '',
        }
      })
      res.status(200).json(result)
    } catch (err) {
      const errorResponse: Data = {
        message: 'Error creating brand',
      };
      res.status(500).json(errorResponse);
      console.error(err)
    }
  } else {
    // Send a response for invalid request method
    const errorResponse: Data = {
      message: 'Invalid request method',
    };
    res.status(400).json(errorResponse);
  }
}










