import CrawledPageModel from '../models/CrawledPageModel';
import { fetchData } from '../helpers/index';


export const crawl =  (req, res) => {
  if (!req.body.url) {
    return res.status(400).json({'message':'url cannot be empty'});
  }
  // check for a valid url
  const url = req.body.url;
  fetchData(url).then( async (response) => {
    // dump to database
    const crawledData = new CrawledPageModel({
      url: url,
      title: response.title || 'No title for page',
      metaDescription: response.meta || 'No meta description for this page',
      h1: response.h1 || 'No h1 text for this page',
      h2: response.h2 || 'No h2 text for this page',
      links: response.links
    });
    // save to db
    await crawledData.save(crawledData).then(() => {
      return res.json({
        'status': 'success',
        'code':'200',
        'message': 'scrapped succesfully'
      });
    }).catch((error) => {
      console.log(error);
    });
  }).catch((error) => {
    return res.json({
      'status': 'failed',
      'code':'302',
      'message': 'scrapping failed',
      'data':error});
  });

};

//load history using mongoose -> https://mongoosejs.com/
export const getHistory = (req, res) => {
  CrawledPageModel.find({}, (error, pages) => {
    if (error) {
      return res.status(400).json(error);
    }

    return res.send(pages);
  });
};

export const deleteUrlCrawledHistory = (req, res) => {
  CrawledPageModel.findByIdAndRemove(req.params.id).then(() => {
    res.send({
      'message':'deleted successfullly'
    });
  }).catch((error) => {
    console.log(error);
    res.status(500).send(
      {
        'message':'unable to delete'
      }
    );
  });
};
