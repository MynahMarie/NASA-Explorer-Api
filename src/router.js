const handler = require('./handler');

const router = (request, response) => {

  if (request.url === "/") {
    handler.handlerHome(request, response);}
   else if (request.url.indexOf('/public/') !== -1) {
      handler.handlerPublic(request, response, request.url);}
      else  {
    handler.handlerBackGround(request, response);
  }
  };


module.exports = router;
