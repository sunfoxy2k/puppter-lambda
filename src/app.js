require('dotenv').config()

const main = async (payload)  => {
    const { website, ...props} = payload
    var crawler;

    switch (website) {
        case 'centeda.com':
            crawler = require('./website-crawler/centeda_com')
            break;    
        case 'checkpeople.com' :
            crawler = require('./website-crawler/checkpeople_com')
            break
        default:
            throw 'Not Support Link'
    }

    return await crawler(props)
}

exports.lambdaHandler = async (event, context) => {

    try {
        const payload = JSON.parse(event.body)

        return {
            statusCode: 200,
            'body': JSON.stringify(
                await main(payload)
            )
        }
    } catch (err) {
        console.log(err)
        return {
            statusCode :  400, 
        }
    }
};

