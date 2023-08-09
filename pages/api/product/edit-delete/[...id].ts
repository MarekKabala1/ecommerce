import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { productData } from '@/components/ProductForm';

interface Data extends productData {
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

      const updatedData = req.body;
      const updatedProduct = await prisma.products.update({
        where: { id: id.toString() },
        data: {
          category: updatedData.category || existingProduct.category,
          productName: updatedData.productName || existingProduct.productName,
          description: updatedData.description || existingProduct.description,
          price: updatedData.price || existingProduct.price,
          imageUrl: updatedData.imageUrl || existingProduct.imageUrl,
          quantity: updatedData.quantity || existingProduct.quantity,
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
