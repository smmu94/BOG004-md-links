const fs = require('fs');
const {
	verifyRoute,
	pathAbsolute,
	getExt,
	readOneFile,
	getAllFiles,
} = require('./auxFunctions');



const mdLinks = (route, options = {validate: false}) => {
	const files = [];
	return new Promise((resolve, reject) => {
		if (verifyRoute(route)) {
			const absRoute = pathAbsolute(route);
			fs.stat(absRoute, (err, stats) => {
				if (err) throw err;
				if (stats.isFile()) {
					if (getExt(absRoute)) {
						readOneFile(absRoute, options).then((links) => {
							if (typeof links === 'object') {
								resolve(links);
							} else {
								resolve([]);
							}
						});
					} else {
						reject('❌El archivo no es Markdown');
					}
				} else {
					getAllFiles(absRoute, files);
					Promise.all(
						files.map((file) => readOneFile(file, options).then((links) => {
							if (typeof links === 'object') {
								return links;
							}
							return [];
						})),
					).then((links) => {
						const linkFlat = links.flat();
						resolve(linkFlat);
					});
				}
			});
		} else if (typeof route === 'string') {
			reject('❌La ruta ingresada no es valida');
		}
	});
};

module.exports = mdLinks;
