const http = require('http'); // pull in the http server module
const url = require('url');
const query = require('querystring');

const responseHandler = require('./responses.js');
const htmlHandler = require('./htmlResponses.js');

// set the port. process.env.PORT and NODE_PORT are for servers like heroku
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// key:value object to look up URL routes to specific functions
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.badRequest,
  '/notImplemented': responseHandler.notImplemented,
  '/internal': responseHandler.internal,
  '/forbidden': responseHandler.forbidden,
  '/notFound': responseHandler.notFound,
  '/unauthorized': responseHandler.unauthorized,
  index: htmlHandler.getIndex,
};

// send this function request and pre-filled response objects.
const onRequest = (request, response) => {
  // parse the url using the url module
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  // grab the 'accept' headers (comma delimited) and split them into an array
  const acceptedTypes = request.headers.accept.split(',');

  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes, params);
  } else {
    urlStruct.index(request, response, acceptedTypes);
  }
};

// start HTTP server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
