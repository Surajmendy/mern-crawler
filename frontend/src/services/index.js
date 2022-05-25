import agent from '../agent/agent';



export const getCrawledData = (page, limit) =>  agent.Crawler.getHistory(page, limit);

export const submitCrawledUrlToServer = (data) => agent.Crawler.crawl(data);
