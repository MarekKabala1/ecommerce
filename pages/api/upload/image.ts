import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '@/utils/cloudinary';


type Data = {
  message: string;
  imageUrl?: string
  cludinary_id?: string
  public_id?: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    try {
      const file = req.body.data;
      const uploadResponse = await cloudinary.uploader.upload(file, {
        upload_preset: 'ecommerce_preset',
        use_filename: true,
        unique_filename: false,
      });
      res.status(200).json({
        message: 'Image uploaded successfully',
        imageUrl: uploadResponse.secure_url,
        cludinary_id: uploadResponse.public_id,
        public_id: uploadResponse.public_id
      });
    } catch (err) {
      console.error('Error uploading image:', err);
      res.status(500).json({ message: 'Error uploading image' });
    }
  } else {
    res.status(400).json({
      message: 'Invalid request method'
    });
  }
}

