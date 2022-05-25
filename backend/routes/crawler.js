import express from 'express';
import { crawl, getHistory, deleteUrlCrawledHistory, deleteAllUrlCrawledHistory } from '../controllers/crawlerController';
let crawlerRouter = express.Router();

// we protect the POST, PUT and DELETE methods
crawlerRouter.post('/crawl', crawl);
crawlerRouter.get('/history', getHistory);
crawlerRouter.delete('/history/:id', deleteUrlCrawledHistory);
crawlerRouter.delete('/history/delete-all', deleteAllUrlCrawledHistory);

export default crawlerRouter;
