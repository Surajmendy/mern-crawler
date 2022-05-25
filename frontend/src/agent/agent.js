import superagent from 'superagent';

const API = 'http://localhost:3000';
const responseBody = (res) => {
  return res.body;
};

const httpHeaders = (req) => {
  req.set('Accept', 'application/json');
};

const requests = {
  del: (url) =>
    superagent.del(`${API}${url}`).use(httpHeaders).then(responseBody),
  get: (url) =>
    superagent.get(`${API}${url}`).use(httpHeaders).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API}${url}`, body).use(httpHeaders).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API}${url}`, body).use(httpHeaders).then(responseBody),
};

const Crawler = {
  crawl: (data) =>
    requests.post('/crawler/crawl', data),
  getHistory: (page, limit) =>
    requests.get(`/crawler/history?page=${page}&limit=${limit}`),
};

export default {
  Crawler,
};
