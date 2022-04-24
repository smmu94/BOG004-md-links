const fs = require("fs");
const path = require("path");

// 1) Verificar si el route es absoluto o relativo, hacerlo absoluto si es relativo

const pathAbsolute = (route) => {
    if (path.isAbsolute(route)) return (route = route);
    else return (route = path.resolve(route));
  };
  
  // const rutaAbsoluta = pathAbsolute('EJEMPLOS MD/src/readme1/Readme1.md');
  // console.log('ruta absoluta', rutaAbsoluta);
  
  // 2) Verificar que el route sea un archivo
  
  const verifyFile = (route) => {
    return new Promise((resolve, reject) => {
      fs.stat(route, (err, stats) => {
        if (err) reject(err);
        resolve(stats.isFile());
      });
    });
  };
  
  // verifyFile(rutaAbsoluta);
  
  // 3) Extensión de un archivo .md
  const getExt = (route) => path.extname(route) === ".md";
  // console.log('el archivo es extensión md?', getExt(rutaAbsoluta));
  
  // 4) Leer archivos md
  const readOneFile = (route) => {
    return new Promise((resolve, reject) => {
      fs.readFile(route, "utf-8", (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  };
  
  // 5) guardar listado los archivos de un directorio
  const listAllFiles = (route) => {
    return fs.readdirSync(route, "utf8");
  };

 module.exports = {pathAbsolute, verifyFile, getExt, readOneFile, listAllFiles};
  
  // readAllFiles('/mnt/c/Users/User/proyectosLaboratoria/BOG004-md-links/EJEMPLOS MD');
  // console.table(readAllFiles('/mnt/c/Users/User/proyectosLaboratoria/BOG004-md-links/ejemplos'));
  
 