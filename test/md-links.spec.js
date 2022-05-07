const mdLinks = require('../src/index.js');
const mocks_data = require('./mocks_data.js');

describe('mdLinks synchronous test', () => {
	it('should be a function', () => {
		expect(typeof mdLinks).toBe('function');
	});
	it('should return a promise if get a file or Directory', () => {
		expect(mdLinks(mocks_data.routeFile)).toBeInstanceOf(Promise);
		expect(mdLinks(mocks_data.routeDir)).toBeInstanceOf(Promise);
	});

	it('should return an error if the route is not valid', () => {
		expect(mdLinks(mocks_data.routeFileInvalid)).rejects.toMatch(
			'❌La ruta ingresada no es valida'
		);
	});
	it('should return an error if the file is not md', () => {
		expect(mdLinks(mocks_data.fileNotMd)).rejects.toMatch(
			'❌El archivo no es Markdown'
		);
	});
});

describe('mdLinks asynchronous test', () => {
	test('should resolve links if its a file', () => {
		return mdLinks(mocks_data.routeFile).then((links) => {
			expect(links).toEqual(mocks_data.linksWithOutValidate);
		});
	});
	test('should resolve links if its a directory', () => {
		return mdLinks(mocks_data.routeFolder).then((links) => {
			expect(typeof links).toBe('object');
		});
	}
	);

	test('should resolve [] if file.md does not have links, () => {', () => {
		return mdLinks(mocks_data.mdFileWithOutLinks).then((links) => {
			expect(links).toEqual([]);
		});
	});

	test('status should to be 404 if options.validate is true', () => {
		return mdLinks(mocks_data.routeFile, { validate: true }).then((links) => {
			return expect(links[0].status).toBe('404');
		});
	});
	test('status info should to be OK if options.validate is true', () => {
		return mdLinks(mocks_data.routeFile, { validate: true }).then((links) => {
			return expect(links[1].ok).toBe('OK');
		});
	});
});
