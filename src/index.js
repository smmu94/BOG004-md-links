const {
  verifyRoute,
  pathAbsolute,
  getExt,
  readOneFile,
  getAllFiles,
} = require("./auxFunctions.js");
const fs = require("fs");


const mdLinks = (route, options) => {
  let files = [];
  return new Promise((resolve, reject) => {
    if (verifyRoute(route)) {
      const absRoute = pathAbsolute(route);
      fs.stat(absRoute, (err, stats) => {
        if (err) throw err;
        if (stats.isFile()) {
          if (getExt(absRoute)) {
            readOneFile(absRoute, options).then((links) => {
              resolve(links);
            });
          } else {
              reject(`❌El archivo ${absRoute} no es Markdown`);
          }
        } else {
          getAllFiles(absRoute, files);
          Promise.all(
            files.map((file) => {
              return readOneFile(file, options).then((links) => {
                return links;
              });
            })
          ).then((links) => {
            let linkFlat = links.flat();
            resolve(linkFlat);
          })
        }
      });
    }     
  });
};


// mdLinks('examples', '--validate').then((links) => {
//   console.log(links);
// });
module.exports = mdLinks;
