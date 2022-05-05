const { options } = require('marked');
const mdLinks = require('../src/index.js');
const mocks = require('./mocks.js');

describe('mdLinks', () => {
	it('should be a function', () => {
		expect(typeof mdLinks).toBe('function');
	});
	it('should return an array', () => {
		expect(typeof mdLinks(mocks.routeFile)).toBe('object');
	});
	it('should return an array', () => {
		expect(typeof mdLinks(mocks.routeFolder)).toBe('object');
	});
	it('should return an error if the route is not valid', () => {
		expect(mdLinks(mocks.routeFileInvalid)).rejects.toMatch(
			'❌La ruta ingresada no es valida'
		);
	});
	it('should return an error if the route is not valid', () => {
		expect(mdLinks(mocks.fileNotMd)).rejects.toMatch(
			'❌El archivo no es Markdown'
		);
	});
	test('should resolve links if its a file', () => {
		return mdLinks(mocks.routeFile).then((links) => {
			expect(links).toEqual(mocks.linksWithOutValidate);
		});
	});

	test('should resolve [] if file.md does not have links, () => {', () => {
		return mdLinks(mocks.mdFileWithOutLinks).then((links) => {
			expect(links).toEqual([]);
		});
	});

	test('should resolve [{href, text, file, status, ok}] if options.validate is true', () => {
		return mdLinks(mocks.routeFolder, { validate: true }).then((links) => {
			expect(links).toEqual(mocks.linksWithValidate);
		});
	});
});
