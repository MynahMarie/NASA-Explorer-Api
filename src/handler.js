const path = require('path');
const fs = require('fs');
const querystring = require('query-string');
const requester = require('request');
const url = require('url');

const handlerHome = ((request, response) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.end('<h1> Sorry, there is Error </h1>');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(file);
    }
  });
});

const handlerPublic = ((request, response, url) => {
  const extension = url.split('.')[1];
  const extenstionTypes = {
    html: 'text/html',
    js: 'application/javascript',
    css: 'text/css',
    jpg: 'image/jpg',
  };
  const filePath = path.join(__dirname, '..', url);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.end('<h1> Sorry , I can not find the file </h1>');
    } else {
      response.writeHead(200, { 'Content-Type': extenstionTypes[extension] });
      response.end(file);
    }
  });
});

const handlerBackground = ((request, response) => {
const parseRequest = url.parse(request.url);
console.log('this is the parseRequest', parseRequest);

const myUrlApi = 'https://api.nasa.gov/planetary/apod?date=&api_key=AZ86PT18yHx9ryUrkgngM4VQ7TLVkP8xsBNdqf1K';
requester(myUrlApi, (err, res, body) => {
  if (err) {
    console.log('err', err);
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end('There is a server error');
  } else {
    const parseData = JSON.parse(body);
    console.log('this the parseData:', parseData);
    const title = parseData.title;
    console.log('this is my title =>', title);
    const theUrl = parseData.url;
    console.log('this is my url =>', theUrl);

    response.writeHead(200);
    response.end(JSON.stringify(title +'&'+ theUrl));
  }
})
});
const handlerAsteroid = ((request, response) => {
const parseRequest2 = url.parse(request.url);
console.log('this is the parseRequest2', parseRequest2);
const parseQuery2 = querystring.parse(parseRequest2.path);
console.log('this is the parseQuery', parseQuery2);
const objVal = Object.values(parseQuery2);
console.log(objVal);

const userInputDate1 = parseQuery2;
console.log('this is the userInputDate:', userInputDate1);
const userInputDate2 = parseQuery2;
console.log('this is the userInputDate:', userInputDate2);
const myUrlApiAsteroid = 'https://api.nasa.gov/neo/rest/v1/feed?start_date='+userInputDate1+'&end_date='+userInputDate2+'&detailed=false&api_key=AZ86PT18yHx9ryUrkgngM4VQ7TLVkP8xsBNdqf1K';
requester(myUrlApiAsteroid, (err, res, body) => {
  if (err) {
    console.log('err', err);
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end('There is a server error');
  } else {
    const parseData2 = JSON.parse(body);
    console.log('this the parseData:', parseData2);


    response.writeHead(200);
    response.end();
  }
})
});

module.exports = {
handlerHome,
handlerPublic,
handlerBackground,
handlerAsteroid
};
