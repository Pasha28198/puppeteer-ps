const chromium = require('chrome-aws-lambda');
const useProxy = require('puppeteer-page-proxy');

const urls = require('./utils/urls');
const captchaService = require('./services/anti-captcha/solvecaptcha');

exports.handler = async (event, context) => {
  let browser = null;

    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
    const page = await browser.newPage();
    await useProxy(page, 'http://user31573:1rpqen@213.166.95.5:1598');
    await page.goto(urls.Sony_Entertainment_Network);
    await page.waitForNavigation();
    await page.mouse.move(100, 100);
    await page.mouse.down();
    await page.mouse.move(200, 200);
    await page.mouse.up();
    await page.focus('[type=email]');
    await page.keyboard.type('pavlognidin@gmail.com');
    await page.focus('[type=password]');
    await page.keyboard.type('dirtydjeck1');
    const [button] = await page.$x("//span[contains(., 'Sign In')]");
    await button.click();
    // await page.screenshot({path: './screenshots/screenshot_' + Math.floor(Date.now() / 1000) + '.png' });
    await Promise.all(
        [captchaService().then( async (res) => {
            await page.evaluate(async(res) => {
                // await page.screenshot({path: './screenshots/screenshot_' + Math.floor(Date.now() / 1000) + '.png' });
             document.querySelector('#g-recaptcha-response').value = res;
            }, res);
            await button.click();
        }).catch(function (error) {
            console.log(error);
        })]
    );
    setTimeout(async() => {
        // await page.screenshot({path: './screenshots/screenshot_' + Math.floor(Date.now() / 1000) + '.png' });
        console.log(page.url())

        return { message: 'lambda work' };
    }, 2000);
}