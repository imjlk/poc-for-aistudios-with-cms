import { AiStudios } from 'models/AiStudios';

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const data = await AiStudios.generateClientToken();
        console.log('!token data', data);
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
