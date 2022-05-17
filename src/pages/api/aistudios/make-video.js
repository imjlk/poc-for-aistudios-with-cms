import { AiStudios } from 'models/AiStudios';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { token, text, model, language } = req.body;
        const data = await AiStudios.makeVideo(token, text, model, language);

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
