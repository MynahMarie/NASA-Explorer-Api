const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querysting');
const rqst = require('request');

const handleHome = (request, response) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      console.log('There is an error at ', error);
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.end('<h1>There is an error in our site...</h1>');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(file);
    }
  });
};

const handlePublic = (request, response, url) => {
  const extention = url.split('.')[1];
  const extentionTypes = {
    html: 'text/html',
    js: 'application/javascript',
    css: 'text/css'
  };
  const filePath = path.join(__dirname, '..', url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.end('Sorry, couldn\'t find this file...');
    } else {
      response.writeHead(200, { 'Content-Type': extentionTypes[extention] });
      response.end(file);
    }
  });
};

const apiInfo = (request, response) => {
  const userUrl = url.parse(request.url);
  const userParse = userUrl.query;

  const userValue = querystring.parse(userParse);
  const myUrl = 'https://api.nasa.gov/planetary/apod';
  rqst(myUrl, (err, res, body) => {
    const parsedBody = JSON.parse(body)
    if(err) {
      console.log('This is an error from my computer: ', error);
      response.writeHead(200, { 'Content-Type': 'text/html' })
      response.end('We have an error in our site');

    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(JSON.stringify());
    }
  })

}
