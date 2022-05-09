const axios = require('axios');
const validateLinks = require('../src/validateLinks.js');
const mocks_data = require('./mocks_data.js');

jest.mock('axios');

describe('validateLinks', () => {
	it('should be a function', () => {
		expect(typeof validateLinks).toBe('function');
	});
	test('should resolve 200 if link is valid', () => {
		const link = mocks_data.linksWithOutValidate[1].href;
		const linkValidateStatus = mocks_data.linksWithValidate[1].status;
		axios.get.mockResolvedValue({ status: 200 });
		return validateLinks(link).then((res) => {
			expect(res.status).toBe(linkValidateStatus);
		});
	});
	test('should resolve 404 if link is not valid', () => {
		const link = mocks_data.linksWithOutValidate[0].href;
		const linkValidateStatus = mocks_data.linksWithValidate[0].status;
		axios.get.mockResolvedValue({ response: { status: 404 } });
		return validateLinks(link).then((err) => {
			expect(err.response.status).toBe(linkValidateStatus);
		});
	});
});
