const http = require('http');
const puppeteer = require('puppeteer');
const useProxy = require('puppeteer-page-proxy');

const urls = require('./utils/urls');
const captchaService = require('./services/anti-captcha/solvecaptcha');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await useProxy(page, 'http://user31573:1rpqen@213.166.95.5:1598');
    await page.goto(urls.Sony_Entertainment_Network);
    await page.waitForNavigation();
    await page.mouse.move(100, 100);
    await page.focus('[type=email]');
    await page.keyboard.type('bg06071971@rambler.ru');
    await page.mouse.down();
    await page.focus('[type=password]');
    await page.keyboard.type('bg06071971');
    await page.mouse.up();
    const [button] = await page.$x("//span[contains(., 'Sign In')]");
    // await page.screenshot({path: './screenshots/screenshot_' + Math.floor(Date.now() / 1000) + '.png' });
    await Promise.all(
        [captchaService().then( async (res) => {
            await page.evaluate(async(res) => {
             document.querySelector('#g-recaptcha-response').value = res;
            }, res);
        }).catch(function (error) {
            console.log(error);
        })]
    );
    await button.click();
    setTimeout(async() => {
        console.log(page.url())
    }, 2000);
})();

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});