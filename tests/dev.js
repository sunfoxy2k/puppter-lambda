crawler = require('../src/website-crawler/centeda_com')

const dev = async() => {
    var context, event = {
        body: {
            firstName: 'Michael',
            lastName: 'Rizzo',
            cit: 'Brooklyn',
            state: 'NY'
        }
    };


    event.body = {
        ...event.body,
        website: 'centeda.com'
    }


    return await crawler(event.body)
}
dev()

module.exports = dev