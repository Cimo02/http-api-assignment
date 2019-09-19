const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>This is a successful response</message></response>';
    return respond(request, response, 200, responseXML, 'text/xml');
  }
  const responseJSON = {
    message: 'This is a successful response',
  };

  return respond(request, response, 200, JSON.stringify(responseJSON), 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML;
    if (params.valid === 'true') {
      responseXML = '<response><message>This request has the valid parameters</message></response>';
      return respond(request, response, 200, responseXML, 'text/xml');
    }

    responseXML = '<response><message>Missing valid query parameter set to true</message><id>badRequest</id></response>';
    return respond(request, response, 400, responseXML, 'text/xml');
  }
  const responseJSON = {
    message: 'Missing valid query parameter set to true',
  };

  if (params.valid === 'true') {
    responseJSON.message = 'This request has the valid parameters';
    return respond(request, response, 200, JSON.stringify(responseJSON), 'application/json');
  }

  responseJSON.id = 'badRequest';
  return respond(request, response, 400, JSON.stringify(responseJSON), 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>The page you are looking for was not found.</message><id>notFound</id></response>';
    return respond(request, response, 404, responseXML, 'text/xml');
  }

  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respond(request, response, 404, JSON.stringify(responseJSON), 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML;
    if (params.loggedIn === 'yes') {
      responseXML = '<response><message>You have successfully viewed the content</message></response>';
      return respond(request, response, 200, responseXML, 'text/xml');
    }

    responseXML = '<response><message>Missing loggedIn query parameter set to yes</message><id>unauthorized</id></response>';
    return respond(request, response, 401, responseXML, 'text/xml');
  }
  const responseJSON = {
    message: 'Missing loggedIn query parameter set to yes',
  };

  if (params.loggedIn === 'yes') {
    responseJSON.message = 'You have successfully viewed the content';
    return respond(request, response, 200, JSON.stringify(responseJSON), 'application/json');
  }

  responseJSON.id = 'unauthorized';
  return respond(request, response, 401, JSON.stringify(responseJSON), 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>You do not have access to this content</message><id>forbidden</id></response>';
    return respond(request, response, 403, responseXML, 'text/xml');
  }

  const responseJSON = {
    id: 'forbidden',
    message: 'You do not have access to this content',
  };

  return respond(request, response, 403, JSON.stringify(responseJSON), 'application/json');
};

const internal = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>Internal Server Error. Something went wrong.</message><id>internal</id></response>';
    return respond(request, response, 500, responseXML, 'text/xml');
  }

  const responseJSON = {
    id: 'internal',
    message: 'Internal Server Error. Something went wrong.',
  };

  return respond(request, response, 500, JSON.stringify(responseJSON), 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = '<response><message>A get request for this page has not been implemented yet. Check again later for updated content.</message><id>notImplemented</id></response>';
    return respond(request, response, 500, responseXML, 'text/xml');
  }

  const responseJSON = {
    id: 'notImplemented',
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
  };

  return respond(request, response, 501, JSON.stringify(responseJSON), 'application/json');
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
};
