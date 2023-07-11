import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '@/utils/cloudinary';


type Data = {
  message: string;
  imageUrl?: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      const file = req.body.data;
      const uploadResponse = await cloudinary.uploader.upload(file, {
        upload_preset: 'ecommerce_preset',
      });
      res.status(200).json({ message: 'Image uploaded successfully', imageUrl: uploadResponse.secure_url });
    } catch (error) {
      console.error('Error uploading image:', error);

      // Error message
      res.status(500).json({ message: 'Error uploading image' });
    }
  } else {
    // Invalid request method message
    res.status(400).json({ message: 'Invalid request method' });
  }
}

