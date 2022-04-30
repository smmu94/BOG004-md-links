#!/usr/bin/env node

const process = require('process');
const mdLinks = require("./index.js");

const route = process.argv[2];
const options = process.argv[3];
mdLinks(route, options).then((links) => {
         console.log(links);
     });




// const ruta = process.argv[2];
// const options = process.argv[3];

// const mdLinks = (ruta, options) => {
//     console.log(ruta, options);
// }
// mdLinks(ruta, options);

