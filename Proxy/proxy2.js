const http = require('http'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({}),
    url = require('url');

var proxyServer = http.createServer(function(req, res) {
  	// console.log("inside func ");
  	// console.log(req.rawHeaders[7]);
    proxy.web(req, res, { target: 'http://localhost:8083' });

}).listen(9000, function() {

    console.log('proxy listening on port 9000');
});

proxyServer.on('upgrade', function (req, socket, head) {
	
  proxy.ws(req, socket, head, { target: 'http://localhost:8083' });
});
