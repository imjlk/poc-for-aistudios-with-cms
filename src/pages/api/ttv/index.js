import TTV from 'models/TTV';
import 'models/dbConnect';

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const ttvs = await TTV.find({}).sort({
          createdAt: 'desc',
        });
        return res.status(200).json({
          success: true,
          data: ttvs,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: error,
        });
      }
    case 'POST':
      try {
        console.log('Post :', req.body);
        const ttvs = await TTV.create(JSON.parse(req.body));
        console.log('ttvs :', ttvs);
        return res.status(201).json({
          success: true,
          data: ttvs,
        });
      } catch (error) {
        console.log('insert error :', error);
        return res.status(400).json({
          success: false,
          error: error,
        });
      }
    default:
      res.setHeaders('Allow', ['GET', 'POST']);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
};
