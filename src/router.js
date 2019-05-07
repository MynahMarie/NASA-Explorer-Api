const handler = require('./handler');

const router = ((request, response) => {
  const url = request.url;
  console.log('this is the url:', url);
  if (url === '/') {
    handler.handlerHome(request, response);
    console.log('this is the url:', url);
  } else if (url.indexOf('/public') !== -1) {
    handler.handlerPublic(request, response, url);
    console.log('this is the url:', url);
  } else if (url.indexOf('/background') !== -1) {
    handler.handlerBackground(request, response);
    console.log('this is the url:', url);
  } else if (url.indexOf('/startDate=') !== -1){
    handler.handlerAsteroid(request, response);
    console.log('this is the url in handlerAsteroidStart=>', url);
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end('<h1> 404 not found </h1>');
  }
});

module.exports = router;
