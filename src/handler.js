const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');
const reQuest = require('request');

const handlerHome = (request, response) => {
  const filePath = path.join(__dirname, "..", "public", "index.html");
    fs.readFile(filePath, (error, file) =>{
    if (error){
      response.writeHead(404, {"Content-Type": "text/html"});
      response.end("404 - File Not Found");
    }else {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.end(file);
    }
  });
};

const handlerPublic =  (request, response, url) => {
  const extension = url.split(".")[1];
  const type = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript"
  }
  const filePath = path.join(__dirname, "..", url);
  fs.readFile(filePath, (error, file) => {
    if (error){
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end("404 - file not found");
    } else {
      response.writeHead(200, { "Content-Type": type });
   response.end(file);
    }
  });
};

const handlerBackGround = (request, response, body) => {
const parsedUrl = url.parse(request.url);
console.log("this is parseUrl",parsedUrl);
const value = querystring.parse(parsedUrl.query);
console.log("this is value",value);
const myUrl = `https://api.nasa.gov/planetary/apod?api_key=${process.env.SECRET_KEY}`;
console.log("this is my URL",myUrl);
const res = myUrl.query;
console.log("this is",res);

const parseBody = JSON.parse(body);
     console.log("parseBody is : ", parseBody);
     let resUrl = parseBody.url;
     console.log('this is urlres:' ,resUrl);
     response.writeHead(200);
     response.end(JSON.stringify(`${resUrl}`));

  const parsedBodyBack =JSON.parse(body);

      res.writeHead(200, {'Content-Type' : 'text/html'});
      res.end(`${parsedBody.rates.ILS}`);
  
}


module.exports = {
  handlerHome,
  handlerPublic,
  handlerBackGround
};
