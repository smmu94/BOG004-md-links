const mocks_data = {
	routeFile: 'test/examples_test/another_examples_test/another_thing.md',
	routeFolder: 'test/examples_test/',
	fileNotMd: 'test/examples_test/something.txt',
	mdFileWithOutLinks : 'test/examples_test/something.md',
	routeFileInvalid: 'Im_not_a_valid_route',
	linksWithOutValidate: [
		{
			href: 'https://www.google.com/idontexist',
			text: 'Some broken link',
			file: 'C:\\Users\\LABORATORIA\\BOG004-md-links\\test\\examples_test\\another_examples_test\\another_thing.md'
		  },
		  {
			href: 'https://sp.depositphotos.com/stock-photos/gatito.html?qview=20163697',
			text: 'I\'m a kitten',
			file: 'C:\\Users\\LABORATORIA\\BOG004-md-links\\test\\examples_test\\another_examples_test\\another_thing.md'
		  },
		  {
			href: 'https://sp.depositphotos.com/stock-photos/gatito.html?qview=20163697',
			text: 'I\'m same kitten',
			file: 'C:\\Users\\LABORATORIA\\BOG004-md-links\\test\\examples_test\\another_examples_test\\another_thing.md'
		  }
	],
	linksWithValidate: [{
		href: 'https://www.google.com/idontexist',
		text: 'Some broken link',
		file: 'C:\\Users\\LABORATORIA\\BOG004-md-links\\test\\examples_test\\another_examples_test\\another_thing.md',
		status: 404,
		ok: 'FAIL'
	  },
	  {
		href: 'https://sp.depositphotos.com/stock-photos/gatito.html?qview=20163697',
		text: 'I\'m a kitten',
		file: 'C:\\Users\\LABORATORIA\\BOG004-md-links\\test\\examples_test\\another_examples_test\\another_thing.md',
		status: 200,
		ok: 'OK'
	  },
	  {
		href: 'https://sp.depositphotos.com/stock-photos/gatito.html?qview=20163697',
		text: 'I\'m same kitten',
		file: 'C:\\Users\\LABORATORIA\\BOG004-md-links\\test\\examples_test\\another_examples_test\\another_thing.md',
		status: 200,
		ok: 'OK'
	  }
		
	]
};

module.exports = mocks_data;


   


