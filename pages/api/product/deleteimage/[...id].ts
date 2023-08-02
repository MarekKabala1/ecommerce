import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '@/utils/cloudinary';

interface Data {
  message?: string;
  public_id?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const public_id = req.body;
    if (!public_id) {
      res.status(404).send({ message: 'Public id is required' })
    }
    try {
      await cloudinary.uploader.destroy(public_id)
        .then(result => console.log(result, public_id))
        .catch(err => console.log(err))
      return res.status(200).json({ message: 'File deleted from Cloudinary' });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error deleting image from Cloudinary' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
