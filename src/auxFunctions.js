const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const getLinks = require('./getLinks.js');

// Verificar que la ruta ingresada es válida

const verifyRoute = (route) => {
	if (fs.existsSync(route)) return true;
};

// Verificar si el route es absoluto o relativo, hacerlo absoluto si es relativo

const pathAbsolute = (route) => {
	if (path.isAbsolute(route)) return (route = route);
	return (route = path.resolve(route));
};

// Extensión de un archivo .md
const getExt = (route) => path.extname(route) === '.md';

// Guardar listado los archivos de un directorio
const listAllFiles = (route) => fs.readdirSync(route, 'utf8');

// Funcion para obtener archivos del directorio
const getAllFiles = (route, files) => {
	const allFiles = listAllFiles(route);
	allFiles.forEach((file) => {
		const absRoute = path.join(route, file);
		if (getExt(absRoute)) {
			files.push(absRoute);
		} else if (path.extname(absRoute) === '') {
			getAllFiles(absRoute, files);
		} else {
			console.error(chalk.bgGray(`\n❌ El archivo ${absRoute} no es Markdown`));
		}
	});
	return files;
};

// Leer archivos md
const readOneFile = (route, options) => new Promise((resolve, reject) => {
	fs.readFile(route, 'utf-8', (err, data) => {
		if (err) reject(err);
		resolve(getLinks(data, route, options));
	});
});

module.exports = {
	verifyRoute,
	pathAbsolute,
	getExt,
	readOneFile,
	listAllFiles,
	getAllFiles,
};
