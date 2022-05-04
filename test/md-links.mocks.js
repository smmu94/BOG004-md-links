const mocks = {
  routeFile: 'examples/README.md',
  routeFolder: 'examples/more_examples',
  fileNotMd: 'examples/more_examples/thumb.png',
  mdFiles: [
   'examples/README.md', 'examples/more_examples/README.md', 'examples/more_examples/LastOne/README.md'
   ],
   mdFileWithOutLinks : 'examples/more_examples/README.md',
   routeFileInvalid: 'examples/more_examples/REDME.md/',
   linksWithOutValidate: [
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: '.\\examples\\README.md'
    },
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: '.\\examples\\README.md'
    },
    {
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: '.\\examples\\README.md'
    },
    {
      href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
      text: 'Arreglos',
      file: '.\\examples\\README.md'
    }
  ],
   linksWithValidate: [
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: '.\\examples\\README.md',
      status: 200,
      ok: 'OK'
    },
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: '.\\examples\\README.md',
      status: 200,
      ok: 'OK'
    },
    {
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: '.\\examples\\README.md',
      status: 200,
      ok: 'OK'
    },
    {
      href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
      text: 'Arreglos',
      file: '.\\examples\\README.md',
      status: 200,
      ok: 'OK'
    }
  ]
 };

module.exports = mocks;


   


