import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

import { categoryTypes } from '@/components/CategoryForm';


interface Data extends categoryTypes {
  message?: string;
  brands?: Data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'GET') {
    const id = req.query.id?.toString();

    if (!id) {
      res.status(400).json({ message: 'Invalid id provided' });
      return;
    }

    try {
      const category = await prisma.category.findUnique({
        where: { id: id },
      });

      if (!category) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      res.status(200).json(category as Data);

    } catch (err) {
      res.status(500).json({ message: 'Error fetching Brand' });
    }
  } else if (req.method === 'PUT') {
    const { id } = req.query;
    if (!id) {
      res.status(400).json({ message: 'id is required' });
      return;
    }

    try {
      const existingCategory = await prisma.category.findUnique({
        where: { id: id.toString() },
      });
      if (!existingCategory) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }

      const updatedData = req.body;
      const updatedCategory = await prisma.category.update({
        where: { id: id.toString() },
        data: {
          id: updatedData.id || existingCategory.id,
          categoryName: updatedData.categoryName || existingCategory.categoryName,
        },
      });

      res.status(200).json(updatedCategory);
    } catch (err) {
      res.status(500).json({ message: 'Error updating brand' });
    }
  } else if (req.method === 'DELETE') {
    const id = req.query.id?.toString();
    if (!id) {
      res.status(400).json({ message: 'id is required' });
      return;
    }
    try {
      const existingCategory = await prisma.category.delete({
        where: { id: id.toString() },
      });
      if (!existingCategory) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }

    } catch (err) {
      res.status(500).json({ message: 'Error deleting category' });
    }

  } else {
    res.status(400).json({ message: 'Invalid request method' });
  }

}
