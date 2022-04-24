const {pathAbsolute, verifyFile, getExt, readOneFile, listAllFiles} = require('./auxFunctions.js'); 
const getLinks = require('./getLinks.js');

 // 6) Funcion recursiva para guardar en un array los archivos .md de un directorio y leerlos

let files = [];
const saveAllmdFiles = (route) => {
  const absRoute = pathAbsolute(route);
  console.log("ruta absoluta", absRoute);
  verifyFile(absRoute)
    .then((resp) => {
      console.log("es un archivo?", resp);
      if (resp) {
        if (getExt(absRoute)) {
          files.push(absRoute);
          return files;
        }
      } else {
        listAllFiles(absRoute).forEach((file) => {
          saveAllmdFiles(absRoute + "/" + file);
        });
      }
    })
    .then((files) => {
      if (files && files.length > 0) {
        files.forEach((file) => {
          readOneFile(file)
            .then((data) => {
              getLinks(data);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

saveAllmdFiles('ejemplos/mas_ejemplos/README copy.md');




// probando con una ruta relativa de un archivo
// module.exports = readAndShowFiles;

// const readAllFilesRecursive = (route) => {
//   const files = fs.readdirSync(route, 'utf8');
//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];
//     const routeFile = path.join(route, file);
//     const stats = fs.statSync(routeFile);
//     if (stats.isFile() && getExt(routeFile)) {
//       readOneFile(routeFile);
//     } else if (stats.isDirectory()) {
//       readAllFilesRecursive(routeFile);
//     }
//   }
// }
