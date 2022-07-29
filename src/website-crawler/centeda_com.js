//  centeda.com
// using serverside rendering HTML from the request
// get data directly from website without Puppetter

const axiosRetry = require('axios-retry');
const axios = require('axios');
const cheerio = require('cheerio');

axiosRetry(axios, { retries: 3 });

const process_html = ($) => {
    const data = $('.row.search-item').map((_, row) => {
        const name = $('.title', row).text();

        const age = $('.age', row).text();
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
    var data = [];

    do {
        const html = await axios.get(url, { 
            timeout: 1000 * 20, 
            // proxy: {
            //     host: 'zproxy.lum-superproxy.io',
            //     port: 80,
            //     auth: {username: 'lum-customer-hl_5ea6d9d9-zone-isp', password: 'cg51kimwdb97'}
            // }
        })

        const $ = cheerio.load(html.data);
        data = [...data, ...process_html($)]

        url = $('[rel=next]').attr()
        url = url && 'https://centeda.com' + url.href
    } while (url);

    return data
}

module.exports = get_data