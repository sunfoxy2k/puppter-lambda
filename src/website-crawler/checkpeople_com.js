// checkpeople.com
// using Puppeteer for proof of concept purpose
// this website may not need to use puppeteer

const puppeteer = require('puppeteer-extra')

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// Add adblocker plugin to block all ads and trackers (saves bandwidth)
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

const process_row = async (row, page) => {
    return {
        name: await row.$eval('.name>a', node => node.innerText),
        age: await page.evaluate(node => node.getAttribute('data-age'), row),
        alias: (await row.$$eval('.also-seen-as li', nodes => nodes.map(node => node.innerText))).join(';'),
        locations: (await row.$$eval('.cities li', nodes => nodes.map(node => node.innerText))).join(';'),
        relatives: (await row.$$eval('.relatives li', nodes => nodes.map(node => node.innerText))).join(';'),
    }
}


const process_html = async (page) => {
    var rowElements = Array.from(await page.$$('li.results-list-item'))
    return await Promise.all(rowElements.map(row => process_row(row, page)))
}

const get_data = async ({ firstName, lastName, state, city }) => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox',
            '--proxy-server=zproxy.lum-superproxy.io:22225'
        ],
    });
    const page = await browser.newPage();
    await page.authenticate({
        username: process.env.PROXY_USER,
        password: process.env.PROXY_PASSWORD
    });

    await page.goto(`https://checkpeople.com/landing/people/gc1k/results?firstName=${firstName}&lastName=${lastName}&state=${state}&city=${city}`)

    const data = await process_html(page)

    await browser.close();

    return data
}

module.exports = get_data