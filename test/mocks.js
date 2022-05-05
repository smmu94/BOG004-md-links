const mocks = {
	routeFile: 'examples/README.md',
	routeFolder: 'examples',
	fileNotMd: 'examples/more_examples/thumb.png',
	mdFileWithOutLinks : 'examples/more_examples/README.md',
	routeFileInvalid: 'examples/more_examples/REDME.md/',
	linksWithOutValidate: [
		{
			href: 'https://es.wikipedia.org/wiki/Markdown',
			text: 'Markdown',
			file: 'C:\\Users\\LABORATORIA\\BOG004-md-links\\examples\\README.md'
		},
		{
			href: 'https://es.wikipedia.org/wiki/Markdown',
			text: 'Markdown',
			file: 'C:\\Users\\LABORATORIA\\BOG004-md-links\\examples\\README.md'
		},
		{
			href: 'https://nodejs.org/',
			text: 'Node.js',
			file: 'C:\\Users\\LABORATORIA\\BOG004-md-links\\examples\\README.md'
		},
	],
	linksWithValidate: [
		{
			href: 'https://curriculum.laboratoria.la/e/topics/javascript/04-arrays',
			text: 'Arreglos',
			file: 'C:\\Users\\LABORATORIA\\BOG004-md-links\\examples\\more_examples\\LastOne\\README.md',
			status: 200,
			ok: 'OK'
		},
		{
			href: 'https://developer.mozilla.org/es/eb/JavaScript/Reference/Global_Objects/Array/',
			text: 'Array - MDN',
			file: 'C:\\Users\\LABORATORIA\\BOG004-md-links\\examples\\more_examples\\LastOne\\README.md',
			status: 404,
			ok: 'FAIL'
		},
		{
			href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort',  
			text: 'Array.prototype.sort() - MDN',
			file: 'C:\\Users\\LABORATORIA\\BOG004-md-links\\examples\\more_examples\\LastOne\\README.md',
			status: 200,
			ok: 'OK'
		},
		{
			href: 'https://es.wikipedia.org/wiki/Markdown',
			text: 'Markdown',
			file: 'C:\\Users\\LABORATORIA\\BOG004-md-links\\examples\\README.md',
			status: 200,
			ok: 'OK'
		},
		{
			href: 'https://es.wikipedia.org/wiki/Markdown',
			text: 'Markdown',
			file: 'C:\\Users\\LABORATORIA\\BOG004-md-links\\examples\\README.md',
			status: 200,
			ok: 'OK'
		},
		{
			href: 'https://nodejs.org/',
			text: 'Node.js',
			file: 'C:\\Users\\LABORATORIA\\BOG004-md-links\\examples\\README.md',
			status: 200,
			ok: 'OK'
		}
	]
};

module.exports = mocks;


   


