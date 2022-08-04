
# Puppeteer BackEnd System

This repo is for proof of concept using AWS API and AWS LAMBDA to crawl data from provided websites.

Success using proxy, and runing crawler locally with AWS SAM api test.

Deploy version on AWS only work for __cendeda.com__, __checkpeople__ run on Puppeteer on aws server have some problem on the physical machine of lambda.

__note__ : .env file is included for the sake of easy demo

## Installation

You need to have:
+ nodejs14
+ npm/yarn
+ docker (for deploy or local test with AWS SAM)
+ [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) for deploy and testing in AWS

### Instal the main code for development
```bash
  cd src
  yarn install
```

### For Development Test
```bash
  cd test
  yarn install
```


    
##  Testing

### Locally
```
cd tests
jest -t local
```

### Run SAM Mock Test 
```
sam build && sam local start-api
cd tests 
jest -t server
```

### Test on Production 
```
sam build && sam local start-api # deploy on aws 
cd tests
jest -t prod
```
## API Reference
Make sure to update api endpoint when deploy on aws
This is current https://lnb6gzyrd6.execute-api.us-west-1.amazonaws.com/Prod/ endpoint

The api endpoint for local testing: https://127.0.0.1:3000 via `sam local start-api`
#### Get all items

```http
  POST /
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `website` | `string` | **Required**. target website to crawl ("centeda.com" or "checkpeople.com")|
| `lastName` | `string` | **Required**. |
| `firstName` | `string` | **Required**. |
| `state` | `string` | **Required**.|
| `city` | `string` | **Required**. |


```
axios.post('https://lnb6gzyrd6.execute-api.us-west-1.amazonaws.com/Prod/', {
        firstName: 'Michael',
        lastName: 'Rizzo',
        city: 'Brooklyn',
        state: 'NY',
        website: 'centeda.com'
})
```
  