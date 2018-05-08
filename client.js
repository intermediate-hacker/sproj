var request = require('request');

request({url:'http://facebook.com', proxy:'http://localhost:8000'}, 
	function (error, response, body){
		if (!error) {
			console.log("here")
			console.log(body)
		}else{
			console.log(error)
		}
	}
)