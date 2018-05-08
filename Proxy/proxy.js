let http = require('http');
let httpProxy = require('http-proxy');

let proxy = httpProxy.createProxyServer({});

http.createServer((req, res) => {
	console.log(req.url)
	proxy.web((req, res, { target: 'http://localhost:8080' }));

}).listen(9000);






