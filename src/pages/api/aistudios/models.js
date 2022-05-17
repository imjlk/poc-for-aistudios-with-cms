import { AiStudios } from 'models/AiStudios';

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const tokenData = await AiStudios.generateClientToken();
        // const { token } = JSON.parse(req.body);
        console.log('tokenData.token :', tokenData.token);
        const data = await AiStudios.getModelList(tokenData.token);

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
