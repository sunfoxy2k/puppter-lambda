'use strict';
require('dotenv').config()
const axios = require('axios')

jest.setTimeout(1000 * 60*5);

const app = require('../src/app.js');
var context, event = {
    body: {
        firstName: 'Victor',
        lastName: 'Rizzo',
        city: 'Brooklyn',
        state: 'NY'
    }
};

describe('local', () => {
    test('local-centeda.com', async () => {
        event.body = JSON.stringify({
            ...event.body,
            website: 'centeda.com'
        })

        const response = await app.lambdaHandler(event, context)

        expect(response.statusCode).toEqual(200);
        const data = JSON.parse(response.body)

        console.log(data)

        expect(data.length > 0).toBeTruthy()
    });
    test('local-checkpeople.com', async () => {
        event.body = JSON.stringify({
            ...event.body,
            website: 'checkpeople.com'
        })

        const response = await app.lambdaHandler(event, context)

        expect(response.statusCode).toEqual(200);
        
        const data = JSON.parse(response.body)

        console.log(data)

        expect(data.length > 0).toBeTruthy()
    });
});

describe('server', () => {
    test('server-centeda.com', async () => {
        event.body = {
            ...event.body,
            website: 'centeda.com'
        }
        const response = await axios.post(process.env.DEV_API_CRAWL_ENDPOINT, event.body)

        expect(response.status).toEqual(200);
        
        expect(response.data.length > 0).toBeTruthy()

    });

    test('server-checkpeople.com', async () => {
        event.body = {
            ...event.body,
            website: 'checkpeople.com'
        }

        const response = await axios.post(process.env.DEV_API_CRAWL_ENDPOINT, event.body)

        expect(response.status).toEqual(200);

        expect(response.data.length > 0).toBeTruthy()
    });
});

describe('prod', () => {
    test('prod-centeda.com', async () => {
        event.body = {
            ...event.body,
            website: 'centeda.com'
        }
        const response = await axios.post(process.env.API_CRAWL_ENDPOINT, event.body)

        expect(response.status).toEqual(200);

        expect(response.data.length > 0).toBeTruthy()
    });

    test('prod-checkpeople.com', async () => {
        event.body = {
            ...event.body,
            website: 'checkpeople.com'
        }

        const response = await axios.post(process.env.API_CRAWL_ENDPOINT, event.body)

        expect(response.status).toEqual(200);

        expect(response.data.length > 0).toBeTruthy()
    });
});