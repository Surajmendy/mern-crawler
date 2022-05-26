import CrawledPageModel from '../models/CrawledPageModel';
import { cheerioScrapper } from '../scrappers/cheerioScrapper';
import { puppeteerScrapper } from '../scrappers/puppeteerScrapper';


export const crawl =  (req, res) => {
  if (!req.body.url) {
    return res.status(400).json({'message':'url cannot be empty'});
  }
  //
  // check for a valid url
  let url = req.body.url;
  // let urlArray = url.split('.');
  // if(urlArray[0] !== 'https' || urlArray[0] !== 'http') {
  //   // add http to url

  // }

  cheerioScrapper(url).then( async (response) => {
    // dump to database
    const crawledData = new CrawledPageModel({
      url: url,
      title: response.title || 'No title set for page',
      metaDescription: response.metaDescription || 'No meta description set for this page',
      h1: response.h1 || 'No h1 text set for this page',
      h2: response.h2 || 'No h2 text set for this page',
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
    // if cheerio could not scrap try with puppetter
    puppeteerScrapper(url).then( async (response) => {
      // dump to database
      const crawledData = new CrawledPageModel({
        url: url,
        title: response.title || 'No title set for page',
        metaDescription: response.metaDescription || 'No meta description set for this page',
        h1: response.h1 || 'No h1 text set for this page',
        h2: response.h2 || 'No h2 text set for this page',
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
    }).catch((err) => {
      return res.json({
        'status': 'failed',
        'code':'302',
        'message': 'scrapping failed',
        'data':err});
    });
  });

};

//load history using mongoose -> https://mongoosejs.com/
export const getHistory =  (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  CrawledPageModel.find({}).sort({creationDate: -1})
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .then( async (pages) => {
      const count =  await CrawledPageModel.countDocuments();
      res.json({
        data: pages,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page)
      });
    }).catch((err) => {
      return res.status(400).json(err);
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

export const deleteAllUrlCrawledHistory = (req, res) => {
  CrawledPageModel.deleteMany({}).then(() => {
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

