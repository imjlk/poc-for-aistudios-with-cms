import TTV from 'models/TTV';
import 'models/dbConnect';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const ttv = await TTV.findById(id);

        return res.status(200).json({
          success: true,
          data: ttv,
        });
      } catch (error) {
        return res.status(404).json({
          success: false,
        });
      }
    case 'PUT':
      try {
        const ttv = await TTV.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        return res.status(200).json({
          success: true,
          data: ttv,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case 'DELETE':
      try {
        await TTV.deleteOne({ _id: id });

        return res.status(200).json({
          success: true,
          data: { id },
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    default:
      res.setHeaders('Allow', ['GET', 'PUT', 'DELETE']);
      return res
        .status(405)
        .json({ success: false })
        .end(`Method ${method} Not Allowed`);
  }
}
