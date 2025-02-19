import puppeteer from 'puppeteer';

export async function RoboDolar(req, res) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const moedaBase = 'dolar';
    const moedaFinal = 'real';
    const urlDaMoeda = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}`;
    await page.goto(urlDaMoeda);
    // await page.screenshot({ path: 'example.png' });
  
    try {
      const resultado = await page.evaluate(() => {
        try {
          return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;
        } catch(e) {
          console.log(e)
        }
      });
      
      if (!resultado) {
        throw new Error('Cotação não encontrada');
      }

      console.log(`O valor de 1 ${moedaBase} em ${moedaFinal} é ${resultado}`)
      return res.status(200).json({status: true, response: [{moedaBase: moedaBase, moedaFinal: moedaFinal, resultado: resultado, message: `O valor de 1 ${moedaBase} em ${moedaFinal} é ${resultado}`}]});
    } catch(err) {
      console.log(err.message);
      return res.status(400).json({status: false, response: [], log: err.message});
    // await browser.close();
    }
}