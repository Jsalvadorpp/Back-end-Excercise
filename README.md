# Back-end-Excercise

## A simple service application using AWS Lambda to perform basic operations over currency formats
## It contains the following requests: 
 * get a list of all currency formats saved
 * get the currency formats for a selected country
 * create a new currency format with customizable fields
 * update an existing currency format 
 * remove a currency format from the database

## Installation & Usage

To set up this web app , you must have Node and [Serveless](https://www.serverless.com/) installed in your machine. In the code file use this to install the packages:

```
  npm install
```

To use this app in local environment , you must use [Serveless-Offline](https://github.com/dherault/serverless-offline).
This code uses MongoDB as databasse, you have to set up the database url in a file .env file with the following fields:

```
  MONGO_URI = <MongoDB_url for dev>
  MONGO_URI_TEST = <MongoDB_url for testing (unit testing)>
  process.env.NODE_ENV = dev
```

## Documentation

All the documentation can be found in postman in the following [Link](https://documenter.getpostman.com/view/13154203/TzRRDoTu)

## Test

For Unit test use: 
```
  npm run test
```
For code coverage: 
```
  npm run coverage
```


