import { AiStudios } from 'models/AiStudios';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const data = await AiStudios.generateToken(req.body.token);
        console.log('!rToken data', data);
        return res.status(200).json({
          success: true,
          data: data,
        });
      } catch (error) {
        console.log(error);
        return res.status(404).json({
          success: false,
        });
      }
    default:
      return res.status(405).json({ success: false });
  }
}
