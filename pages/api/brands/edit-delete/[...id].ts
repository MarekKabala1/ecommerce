import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { brandTypes } from '@/components/BrandForm';


interface Data extends brandTypes {
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
      const brand = await prisma.brand.findUnique({
        where: { id: id },
      });

      if (!brand) {
        res.status(404).json({ message: 'Brand not found' });
        return;
      }
      res.status(200).json(brand as Data);

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
      const existingBrand = await prisma.brand.findUnique({
        where: { id: id.toString() },
      });
      if (!existingBrand) {
        res.status(404).json({ message: 'Brand not found' });
        return;
      }

      const updatedData = req.body;
      const updatedBrand = await prisma.brand.update({
        where: { id: id.toString() },
        data: {
          id: updatedData.id || existingBrand.id,
          brandName: updatedData.brandName || existingBrand.brandName,
          public_id: updatedData.public_id || existingBrand.public_id,
        },
      });

      res.status(200).json(updatedBrand);
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
      const existingBrand = await prisma.brand.delete({
        where: { id: id.toString() },
      });
      if (!existingBrand) {
        res.status(404).json({ message: 'Brand not found' });
        return;
      }

    } catch (err) {
      res.status(500).json({ message: 'Error deleting brand' });
    }

  } else {
    res.status(400).json({ message: 'Invalid request method' });
  }

}
