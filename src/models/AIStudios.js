import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
export class AiStudios {
  static AISTUDIOS_API_BASE_URL = process.env.AISTUDIOS_API_BASE_URL;
  static AISTUDIOS_API_APP_ID = process.env.AISTUDIOS_API_APP_ID;
  static AISTUDIOS_API_CLIENT_HOST_NAME =
    process.env.AISTUDIOS_API_CLIENT_HOST_NAME;
  static AISTUDIOS_API_UUID = process.env.AISTUDIOS_API_UUID;

  // generate New Token (GET)
  static async generateClientToken() {
    try {
      const axiosInstance = axios.create({
        baseURL: AiStudios.AISTUDIOS_API_BASE_URL,
      });
      console.log('* * * getClientToken * * *');
      const { data } = await axiosInstance.get(
        `generateClientToken?appId=${AiStudios.AISTUDIOS_API_APP_ID}&userKey=${AiStudios.AISTUDIOS_API_UUID}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // getModelList (POST)
  static async getModelList(token, appId = 'aistudios.com', sdk_v = '1.0') {
    try {
      const axiosInstance = axios.create({
        baseURL: AiStudios.AISTUDIOS_API_BASE_URL,
      });
      const body = {
        appId, // 발급받은 appId, default : "aistudios.com"
        platform: 'web', // platfrom, static value : "web"
        isClientToken: true, // 인증 방식이 ClientToken 인지, boolean : true
        token, // token
        uuid: AiStudios.AISTUDIOS_API_UUID, // uuid
        sdk_v, // SDK 버전 명시, default "1.0"
        clientHostname: appId, // 호스트명 appId 와 동일
      };

      const { data } = await axiosInstance.post('getModelList', body);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  // makeVideo (POST)
  static async makeVideo(
    token,
    model = 'ysy',
    text = '안녕하세요',
    language = 'ko',
    appId = 'aistudios.com',
    sdk_v = '1.0'
  ) {
    try {
      const axiosInstance = axios.create({
        baseURL: AiStudios.AISTUDIOS_API_BASE_URL,
      });
      const body = {
        appId, // 발급받은 appId, default : "aistudios.com"
        platform: 'web', // platfrom, static value : "web"
        isClientToken: true, // 인증 방식이 ClientToken 인지, boolean : true
        token, // token
        uuid: AiStudios.AISTUDIOS_API_UUID, // uuid
        sdk_v, // SDK 버전 명시, default "1.0"
        clientHostname: appId, // 호스트명, appId 와 동일
        model, // model의 ID
        language: language, // AI 사용 언어
        text, // TTV 대상 TEXT
      };

      const { data } = await axiosInstance.post('makeVideo', body);

      return data.data;
    } catch (error) {
      console.log(error);
    }
  }

  // findProject (POST)
  static async findProject(token, key, appId = 'aistudios.com', sdk_v = '1.0') {
    try {
      const axiosInstance = axios.create({
        baseURL: AiStudios.AISTUDIOS_API_BASE_URL,
      });
      const body = {
        appId, // 발급받은 appId, default : "aistudios.com"
        platform: 'web', // platfrom, static value : "web"
        isClientToken: true, // 인증 방식이 ClientToken 인지, boolean : true
        token, // token
        uuid: AiStudios.AISTUDIOS_API_UUID, // uuid
        sdk_v, // SDK 버전 명시, default "1.0"
        clientHostname: appId, // 호스트명, appId 와 동일
        key, // TTV의 key
      };

      const { data } = await axiosInstance.post('findProject', body);

      return data.data;
    } catch (error) {
      console.log(error);
    }
  }

  // findNumber (TEST용도 AISTUDIOS DEV 오류로 인해)
  static async findNumber(token, key) {
    if (token == undefined || key == undefined) {
      return console.log('findNumber error 발생');
    }
    var now = new Date();
    var second = now.getSeconds();

    return second;
  }
}
