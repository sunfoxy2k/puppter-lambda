'use strict';
jest.setTimeout(1000 * 60);

const app = require('../src/app.js');
var context, event = {
    body: {
        firstName : 'Michael',
        lastName : 'Rizzo',
        city : 'Brooklyn',
        state : 'NY' 
    }
};



describe('local crawler test', () => {
    test('centeda.com', async () => {
        event.body = JSON.stringify({
            ...event.body, 
            website: 'centeda.com'
        })

        const response = await app.lambdaHandler(event, context)

        expect(response.statusCode).toEqual(200);
    });
});
