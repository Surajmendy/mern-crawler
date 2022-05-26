/* eslint-disable no-async-promise-executor */
const puppeteer = require('puppeteer');
// scrap client side rendering urls
export const puppeteerScrapper = (url) => {
  return new Promise( async (resolve, reject) => {
    try {
      const URL = url;
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(URL);
      // get title
      // handle all await calls with Promise.all()
      const title = await page.title();
      const h1 = await page.$eval(
        'h1',
        (el) => el.textContent
      );
      const h2 = await page.$eval(
        'h2',
        (el) => el.textContent
      );
      const meta = await page.$eval('head > meta[name="description"]', element => element.content);
      let linksData = await page.evaluate(() => {
        let results = [];
        let items = document.querySelectorAll('a');
        items.forEach((item) => {
          results.push({
            url: item.getAttribute('href')
          });
        });
        return results;
      });

      await browser.close();
      resolve(
        {
          'title': title,
          'metaDescription': meta,
          'h1': h1,
          'h2': h2,
          'links': linksData,
          'linksCount':linksData.length
        }
      );
    } catch (error) {
      reject(error);
      console.error(error);
    }

  });
};
