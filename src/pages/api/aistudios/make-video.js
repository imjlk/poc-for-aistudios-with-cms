import { AiStudios } from 'models/AiStudios';

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { text, model, language } = JSON.parse(req.body);
        const tokenData = await AiStudios.generateClientToken();
        const data = await AiStudios.makeVideo(
          tokenData.token,
          text,
          model,
          language
        );
        console.log('makeVideo :', data);
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
};
