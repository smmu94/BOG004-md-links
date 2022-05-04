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
              if(typeof links === 'object'){
                resolve(links);
               } else {
                resolve([]);
               }
              
            });
          } else {
              reject(`❌El archivo no es Markdown`);
          }
        } else {
          getAllFiles(absRoute, files);
          Promise.all(
            files.map((file) => {
              return readOneFile(file, options).then((links) => {
                if(typeof links === 'object'){
                 return links;
                } else {
                  return [];
                }
              });
            })
          ).then((links) => {
            let linkFlat = links.flat();
            resolve(linkFlat);
          })
        }
      });
    } else {
      reject('❌La ruta no es valida');
    }  
  });
};

module.exports = mdLinks;
