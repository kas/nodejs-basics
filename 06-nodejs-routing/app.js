var url = require('url'); // provides helper functions to let us work with a url
var fs = require('fs');

function renderHTML(path, response) {
  fs.readFile(path, null, function(error, data) { // data gets populated if operation is successful
    if (error) {
      response.writeHead(404);
      response.write('File not found!');
    } else {
      response.write(data);
    }

    response.end();
  });
}

module.exports = {
  handleRequest: function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'}); // default if we targeted a valid route

    var path = url.parse(request.url).pathname;

    switch(path) {
      case '/':
        renderHTML('./index.html', response);
        break;
      case '/login':
        renderHTML('./login.html', response);
        break;
      default:
        response.writeHead(404);
        response.write('Route not defined.');
        response.end();
        break;
    }
  }
};
