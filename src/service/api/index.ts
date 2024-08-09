import axios from 'axios';

// 建立 Axios 實例
const instance = axios.create({
  baseURL: 'http://192.168.1.188:7011',
  timeout: 6000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
});

export default {
  async GET(url: string, params?: object) {
    try {
      const res = await instance.get(url, { params });
      return res.data;
    } catch (error: any) {
      return Promise.reject(error.response?.data || error.message);
    }
  },

  async POST(url: string, data?: object, config?: object) {
    try {
      const res = await instance.post(url, data, config);
      return res.data;
    } catch (error: any) {
      return Promise.reject(error.response?.data || error.message);
    }
  },

  async DELETE(url: string, params?: object) {
    try {
      const res = await instance.delete(url, { params });
      return res.data;
    } catch (error: any) {
      return Promise.reject(error.response?.data || error.message);
    }
  },

  async request(config: object) {
    try {
      const res = await instance.request(config);
      return res.data;
    } catch (error: any) {
      return Promise.reject(error.response?.data || error.message);
    }
  }
};
