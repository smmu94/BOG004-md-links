const {
  verifyRoute,
  pathAbsolute,
  getExt,
  readOneFile,
  getAllFiles,
} = require("./auxFunctions.js");
const fs = require("fs");

let files = [];
const mdLinks = (route, options) => {
  if (verifyRoute(route)) {
    const absRoute = pathAbsolute(route);
    fs.stat(absRoute, (err, stats) => {
      if (err) throw err;
      if (stats.isFile()) {
        if (getExt(absRoute)) {
          readOneFile(absRoute).then((links) => {
            return links;
          });
        } else {
          console.log("El archivo no es Markdown");
        }
      } else {
        getAllFiles(absRoute, files);
        files.forEach((file) => {
          readOneFile(file).then((links) => {
            return links;
          });
        });
      }
    });
  } else console.log("La ruta ingresada no es válida");
};

module.exports = mdLinks;

