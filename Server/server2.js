const server = require('http').createServer(handler);
const fs = require('fs');
const io = require('socket.io')(server);
const request = require('request');
const pythonShell = require('python-shell');

const compression = require('./compression');

async function handler (req, res) {
	console.log(`Request from host ${req.headers.host}`);

  	if(req.headers.host === 'localhost:9000') {
  		console.log(`Printing request headers`);
  		const newFileName = await compression.handleCompression('hello.html');

  		fs.readFile(newFileName, (err, data) => {
	    
		    if (err) {

		      res.writeHead(500)
		      return res.end('Error loading test.html')

		    }

		    res.writeHead(200, {'Content-Type' : 'text/html', 'Content-Encoding' : 'gzip'});
		    
		    res.end(data)
	  
  		})
  	}

  	else {
  		
  		request('http://'+req.headers.host,  { json: true }, (err, res2, body) => {
	  
		if(err) { 

			return console.log(err) 

		}

		writeResponseToFile(body)
		callCodeOptimizer()
	
		
		fs.readFile('response.html', function (err, data) {
	    
		    if (err) {

		      res.writeHead(500)
		      return res.end('Error loading index.html')

		    }

		    res.writeHead(200)
		    res.end(data)
		
		})

  		})
	
	}
}


io.on('connection', function (socket) {

	//get data regarding client after sending test.html

	socket.on('data', function(data) {
		
		manipulate(data)
	})

})




function manipulate (data) {

	fs.writeFileSync('data.json', JSON.stringify(data, null, 2) , 'utf-8');

}

function writeResponseToFile(body) {

	fs.writeFile('response.html', body, function(err) {

	    if(err) {

	        return console.log(err)

	    }

	    console.log("The file was saved!")

	}) 

}

function callCodeOptimizer() {

	pythonShell.run('page_parser.py', function (err) {
	  
	  if (err) throw err;

	  console.log('finished');

	});

}

server.listen(8083);