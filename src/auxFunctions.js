const fs = require("fs");
const path = require("path");
const getLinks = require("./getLinks");

// Verificar que la ruta ingresada es válida

const verifyRoute = (route) => {
  if (fs.existsSync(route)) return true;
};

// Verificar si el route es absoluto o relativo, hacerlo absoluto si es relativo

const pathAbsolute = (route) => {
  if (path.isAbsolute(route)) return (route = route);
  else return (route = path.resolve(route));
};

// Extensión de un archivo .md
const getExt = (route) => path.extname(route) === ".md";

// Guardar listado los archivos de un directorio
const listAllFiles = (route) => {
  return fs.readdirSync(route, "utf8");
};

// Funcion para obtener archivos del directorio
const getAllFiles = (route, files) => {
  let allFiles = listAllFiles(route);
  allFiles.forEach((file) => {
    let absRoute = path.join(route, file);
    if (getExt(absRoute)) {
      files.push(absRoute);
    } else if (fs.statSync(absRoute).isDirectory()) {
      getAllFiles(absRoute, files);
    } else {
      console.log(`El archivo ${absRoute} no es Markdown`);
    }
  });
  return files;
};

// Leer archivos md
const readOneFile = (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile(route, "utf-8", (err, data) => {
      if (err) reject(err);
      resolve(getLinks(data, route));
    });
  });
};

module.exports = {
  verifyRoute,
  pathAbsolute,
  getExt,
  readOneFile,
  listAllFiles,
  getAllFiles,
};

// Verificar que el route sea un archivo

// const verifyFile = (route) => {
//   fs.stat(route, (err, stats) => {
//     if (err) throw err;
//     if (stats.isFile()) {
//       if (getExt(route)) {
//         readOneFile(route).then((links) => {return console.log(links)});
//       } else {
//         console.log("El archivo no es Markdown");
//       }
//     } else {
//       getAllFiles(route);
//       files.forEach((file) => {
//         readOneFile(file).then((links) => {return console.log(links)});
//       });
//     }
//   });
// };
