import { AiStudios } from 'models/AiStudios';

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const tokenData = await AiStudios.generateClientToken();
        const { token, key } = JSON.parse(req.body);
        const data = await AiStudios.findProject(tokenData.token, key);

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
