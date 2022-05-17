import { AiStudios } from 'models/AiStudios';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const data = await AiStudios.generateClientToken();

        // TODO: 쿠키 저장. 에러 재시도 처리
        const rTokenData = await AiStudios.generateToken(data.token);
        const { token } = rTokenData;
        const newData = { ...data, rToken: token };

        console.log('!token data', newData);
        return res.status(200).json({
          success: true,
          data: newData,
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
