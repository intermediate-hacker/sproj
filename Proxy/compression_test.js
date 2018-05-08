let CWebp = require('cwebp').CWebp;
let DWebp = require('cwebp').DWebp;

let encoder = new CWebp('zaid.png');

encoder.write('zaid.webp', err => {
	console.log(err || 'encoded successfully');
});