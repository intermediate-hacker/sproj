"use strict";

const CWebp = require('cwebp').CWebp;
const DWebp = require('cwebp').DWebp;
const targz = require('targz');
const zlib = require('zlib');
const fs = require('fs');

const extension_dict = require('./extension_dict');

const getFileName = req => {
	const arr = req.split('/');
	return arr[arr.length - 1];
};

const getExtension = req => {
	const arr = req.split('.');
	return arr[arr.length - 1];
};

const switchExtension = (req, newExt) => {
	let arr = req.split('.');
	arr.pop();
	return arr.join('.') + '.' + newExt; 
}

async function handleCompression(req) {
	const compression_type = extension_dict.compression_mapper[getExtension(req)];
	const fileName = getFileName(req);

	if (compression_type === 'webp') {
		const newFileName = await compressWebp(fileName);
		return newFileName;
	} else if (compression_type === 'targz') {
		const newFileName = await compressTarGz(fileName);
		return newFileName;
	} else if (compression_type === 'gzip') {
		const newFileName = await compressGzip(fileName);
		return newFileName;
	}
}

const compressWebp = fileName => new Promise((resolve, reject) => {
	const encoder = CWebp(fileName);
	const newFileName = switchExtension(fileName, 'webp');

	encoder.write(newFileName, err => {
		if (err) {
			reject(err);
		} else {
			console.log(`Webp compression done. ${fileName} -> ${newFileName}`);
			resolve(newFileName);
		}
	});
});

const compressTarGz = fileName => new Promise((resolve, reject) => {
	const newFileName = switchExtension(fileName, 'tar.gz');
	targz.compress({src: fileName, dest: newFileName}, err => {
		if (err) {
			reject(err);
		} else {
			console.log(`Tar Gzip compression done: ${fileName} -> ${newFileName}`);
			resolve(newFileName);
		}
	});
});

const compressGzip = fileName => new Promise((resolve, reject) => {
	const newFileName = switchExtension(fileName, '2.html');
	const gzip = zlib.createGzip();

	const r = fs.createReadStream(fileName);
	const w = fs.createWriteStream(newFileName);

	w.on('finish', () => {
		console.log(`Gzip compression done: ${fileName} -> ${newFileName}`);
		resolve(newFileName);	
	});

	w.on('error', err => {
		reject(err);
	});

	r.pipe(gzip).pipe(w);
});

module.exports = { handleCompression };