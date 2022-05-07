const { marked } = require('marked');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const validateLinks = require('./validateLinks');

const onelink = {
	href: '',
	text: '',
	file: '',
};

// Funcion para obtener los links de un archivo .md
const getLinks = (data, file, options) => {
	const arraylink = [];
	const html = marked(data);
	const dom = new JSDOM(html);
	const { document } = dom.window;
	const links = document.querySelectorAll('a');
	if (links.length === 0) {
		return console.error(`❌El archivo ${file} no contiene links`);
	}

	links.forEach((link) => {
		if (link.href.includes('http')) {
			link.text.length > 50
				? (link.text = `${link.text.substring(0, 50)}...`) // si el texto es mayor a 50 caracteres, cortarlo
				: link.text;
			const newLink = Object.create(onelink);
			newLink.href = link.href;
			newLink.text = link.text;
			newLink.file = file;
			arraylink.push(newLink);
		}
	});
	if (options.validate) {
		return Promise.all(
			arraylink.map((link) =>
				validateLinks(link.href)
					.then((res) => {
						link.status = res.status;
						link.ok = 'OK';
						return link;
					})
					.catch((err) => {
						link.status = err.status;
						link.ok = 'FAIL';
						return link;
					})
			)
		).then(links =>{
			return links;
		});
	}
	return arraylink;
};

module.exports = getLinks;
