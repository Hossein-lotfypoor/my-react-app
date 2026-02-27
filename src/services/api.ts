import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // این فعلاً یه آدرس تستیه
  timeout: 5000, // اگه سرور بعد ۵ ثانیه جواب نداد، بیخیال شو
});

export default api;