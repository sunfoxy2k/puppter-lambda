//  centeda.com
// using serverside rendering HTML from the request
// get data directly from website without Puppetter
var axios = require('axios');

const axiosRetry = require('axios-retry');
const cheerio = require('cheerio');
const HttpsProxyAgent = require("https-proxy-agent")

const httpsAgent = new HttpsProxyAgent({
                host: 'zproxy.lum-superproxy.io',
                port: 22225,
                auth: `${process.env.PROXY_USER}:${process.env.PROXY_PASSWORD}`
            })
axios = axios.create({httpsAgent});


axiosRetry(axios, { retries: 3 });


const process_html = ($) => {
    const data = $('.row.search-item').map((_, row) => {
        const name = $('.title', row).text();

        var age = $('.age', row).text();
        age = (age && age.split('Age ')[1]) || ''

        const locations = $('.lived-in li', row).map((_, el) => $(el).text()).toArray().join(';')

        const relatives = $('.related-to li', row).map((_, el) => $(el).text()).toArray().join(';')

        const alias = $('.known-as li', row).map((_, el) => $(el).text()).toArray().join(';')

        return {
            name,
            age,
            alias,
            locations,
            relatives
        }
    }).toArray()

    return data

}

const get_data = async ({ firstName, lastName, state, city }) => {
    var url = `https://centeda.com/profile/search?fname=${firstName}&lname=${lastName}&state=${state}&city=${city}`;
    var html, $, data = [];

    do {
        const html = await axios.get(url, { 
            timeout: 1000 * 20, 
        })

        const $ = cheerio.load(html.data);
        data = [...data, ...process_html($)]

        url = $('[rel=next]').attr()
        url = url && 'https://centeda.com' + url.href
    } while (url);

    return data
}

module.exports = get_data