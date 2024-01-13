import axios from 'axios';
import { API_BASE_URL, API_KEY } from 'react-native-dotenv';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    // You can add token or other headers here
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default api;

// src/utils/api.js

// ... (既存のコード)

// searchTweets関数を追加
const searchTweets = async (query) => {
  try {
    const response = await api.get('/search/tweets', {
      params: {
        q: query, // Twitter APIの検索クエリパラメータ
        // その他の必要なパラメータを追加
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching tweets:', error);
    throw error;
  }
};

// searchTweets関数をエクスポート
export { searchTweets };

// ... (既存のコード)