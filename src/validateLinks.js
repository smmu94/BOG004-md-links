const axios = require('axios');

const validateLinks = (link) => {
	return new Promise((resolve) => {
		axios
			.get(link)
			.then((res) => {
				resolve(res);
			})
			.catch((err) => {
				resolve(err.response);
			});
	});
};

module.exports = validateLinks;
