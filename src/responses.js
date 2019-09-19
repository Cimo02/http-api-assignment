const respond = (request, response, status, content, type) => {
    response.writeHead(status, { 'Content-Type': type });
    response.write(content);
    response.end();
};

const success = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml'){
    let responseXML = "<response>";
    responseXML = `${responseXML} <message>This is a successful response</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }
  const responseJSON = {
    message: 'This is a successful response',
  };
    
  const responseString = JSON.stringify(responseJSON);
  respond(request, response, 200, responseString, 'application/json');
};
  
const badRequest = (request, response, acceptedTypes, params) => {
  if (acceptedTypes[0] === 'text/html'){
    let responseXML;
    if (params === null){
      responseXML = "<response>" // FINSIH THIS!!!!!!!!!!!!!!!!!!!!!!!
    }
  }
    const responseJSON = {
        message:'This request has the valid parameters',
    }
    
    if (params === null){
        responseJSON.id = 'badRequest';
        responseJSON.message = 'Missing valid query parameter set to true';
        respond(request, response, 400, responseJSON, 'application/json');
        return;
    }

    respond(request, response, 200, responseJSON, 'application/json');
};
  
const notFound = (request, response, acceptedTypes) => {
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };
  
    respond(request, response, 404, responseJSON, 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
    const responseJSON = {
      message: 'You have successfully viewed the content',
    };
  
    if (params === null){
        responseJSON.id = 'unauthorized';
        responseJSON.message = 'Missing loggedIn query parameter set to yes';
        respond(request, response, 401, responseJSON, 'application/json');
        return;
    }

    respond(request, response, 200, responseJSON, 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
    const responseJSON = {
      id: 'forbidden',
      message: 'You do not have access to this content',
    };
  
    respond(request, response, 403, responseJSON, 'application/json');
};

const internal = (request, response, acceptedTypes) => {
    const responseJSON = {
      id: 'internal',
      message: 'Internal Server Error. Something went wrong.',
    };
  
    respond(request, response, 500, responseJSON, 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
    const responseJSON = {
      id: 'notImplemented',
      message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    };
  
    respond(request, response, 501, responseJSON, 'application/json');
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