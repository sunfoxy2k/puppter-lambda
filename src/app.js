require('dotenv').config()

const main = async (payload) => {
    const { website, ...props } = payload
    var crawler;

    switch (website) {
        case 'centeda.com':
            crawler = require('./website-crawler/centeda_com')
            break;
        case 'checkpeople.com':
            crawler = require('./website-crawler/checkpeople_com')
            break
        default:
            throw 'Not Support Link'
    }

    return await crawler(props)
}

exports.lambdaHandler = async (event, context) => {
    try {
        var response = ''

        if (event.body) {
            const payload = JSON.parse(event.body)
            response = await main(payload)
        }


        response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify(
                response
            )
        }

        return response
    } catch (err) {

        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify(err)
        }
    }
};

