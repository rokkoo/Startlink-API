const puppeteer = require('puppeteer');

// https://www.n2yo.com/?s=70027
//github.com/teresaromero/scrapper
// https://opencagedata.com/demo

/**
 * LAST QUEE SENDED
 * from 45551 to 45589
 * Last in the quee 45569
 * First in the quee 45572
 * In middle of the quee 45562
 */

(async () => {
   const browser = await puppeteer.launch();
   const page = await browser.newPage();

   const NORAD_ID = 70027;

   await page.goto(`https://www.n2yo.com/?s=${NORAD_ID}`, {
      waitUntil: 'networkidle2',
   });

   let totalPetitions = 0;

   setInterval(async () => {
      const data = await page.evaluate(() => {
         const noradid = document.querySelector('div[id="noradid"]').innerText;
         const localtime = document.querySelector('div[id="localtime"]')
            .innerText;
         const utctime = document.querySelector('div[id="utctime"]').innerText;
         const satlat = document.querySelector('div[id="satlat"]').innerText;
         const satlng = document.querySelector('div[id="satlng"]').innerText;
         const satAltkm = document.querySelector('div[id="sataltkm"]')
            .innerText;
         const satAltmi = document.querySelector('div[id="sataltmi"]')
            .innerText;
         const satspdkm = document.querySelector('div[id="satspdkm"]')
            .innerText;
         const satspdmi = document.querySelector('div[id="satspdmi"]')
            .innerText;
         const satazy = document.querySelector('span[id="sataz"]').innerText;
         const satel = document.querySelector('div[id="satel"]').innerText;
         const satra = document.querySelector('div[id="satra"]').innerText;
         const satdec = document.querySelector('div[id="satdec"]').innerText;
         const lmst = document.querySelector('div[id="lmst"]').innerText;
         const period = document.querySelector('div[id="period"]').innerText;
         const satshadow = document.querySelector('div[id="satshadow"]')
            .innerText
            ? document.querySelector('div[id="satshadow"]').innerText
            : null;

         return {
            noradid,
            localtime,
            utctime,
            satlat,
            satlng,
            satAltkm,
            satAltmi,
            satspdkm,
            satspdmi,
            satazy,
            satel,
            satra,
            satdec,
            lmst,
            period,
            satshadow,
         };
      });

      console.log({ totalPetitions: (totalPetitions += 1) });

      console.log(data);
   }, 1000);

   // await browser.close();
})();
