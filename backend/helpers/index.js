/* eslint-disable no-async-promise-executor */
import cheerio from 'cheerio';
import got from 'got';

export const fetchData =  (url) => {
  return new Promise( async (resolve, reject) => {
    try {
      const pageResponse = await got(url);
      const pageHtml = pageResponse.body;
      const $ = cheerio.load(pageHtml);

      const title = $('title').text();
      const meta = $('meta[name="description"]').attr('content');
      const h1 = $('h1').text();
      const h2 = $('h2').text();
      const allPageLinks = $('a');

      const allPagelinksArray = [];
      allPageLinks.each((index, element) => {
        allPagelinksArray.push({
          href: $(element).attr('href').replace(/\s/g, '')
        });
      });
      resolve(
        {
          'title': title,
          'metaDescription': meta,
          'h1': h1,
          'h2': h2,
          'links': allPagelinksArray,
          'linksCount':allPagelinksArray.length
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

