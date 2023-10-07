import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { Product } from '@/components/ProductForm';

interface Data extends Product {
  [x: string]: any;
  message?: string;
  products?: Data;
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
      const product = await prisma.products.findUnique({
        where: { id: id },
      });

      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(200).json(product as Data);

    } catch (err) {
      res.status(500).json({ message: 'Error fetching product' });
    }
  } else if (req.method === 'PUT') {
    const { id } = req.query;
    if (!id) {
      res.status(400).json({ message: 'id is required' });
      return;
    }

    try {
      const existingProduct = await prisma.products.findUnique({
        where: { id: id.toString() },
      });
      if (!existingProduct) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      if ((existingProduct.categoryId === null || existingProduct.categoryId === undefined) &&
        (existingProduct.brandId === null || existingProduct.brandId === undefined)) {
        throw new Error('Error selecting Category or Brand');
      }
      if (!id || id === undefined) {
        throw new Error('Something went wrrong try again')
      }

      const updatedData = req.body
      const updatedProduct = await prisma.products.update({
        where: { id: id.toString() },
        data: {
          id: updatedData.id || existingProduct.id,
          productName: updatedData.productName || existingProduct.productName,
          categoryId: updatedData.categoryId || existingProduct.categoryId,
          brandId: updatedData.brandId || existingProduct.brandId,
          description: updatedData.description || existingProduct.description,
          imageUrl: updatedData.imageUrl || existingProduct.imageUrl,
          price: updatedData.price || existingProduct.price,
          quantity: updatedData.quantity || existingProduct.quantity,
          isFeatured: updatedData.isFeatured,
          isArchived: updatedData.isArchived,

        },
      });
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json({ message: 'Error updating product' });
    }
  } else if (req.method === 'DELETE') {
    const id = req.query.id?.toString();
    if (!id) {
      res.status(400).json({ message: 'id is required' });
      return;
    }
    try {
      const existingProduct = await prisma.products.delete({
        where: { id: id.toString() },
      });
      if (!existingProduct) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

    } catch (err) {
      res.status(500).json({ message: 'Error deleting product' });
    }

  } else {
    res.status(400).json({ message: 'Invalid request method' });
  }

}
