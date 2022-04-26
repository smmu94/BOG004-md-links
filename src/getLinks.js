const { marked } = require("marked");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const onelink = {
  href: "",
  text: "",
  file: "",
};
// Funcion para obtener los links de un archivo .md
let arrayLinks = [];
const getLinks = (data, file) => {
  let html = marked(data);
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const links = document.querySelectorAll("a");
  if (links.length === 0) return console.log("No hay links en el archivo " + file);
  else {
  links.forEach((link) => {
    if(link.href.includes("http")){
    let newLink = Object.create(onelink);
    newLink.href = link.href;
    newLink.text = link.text;
    newLink.file = file;
    arrayLinks.push(newLink);
    }
  });
  return console.log(arrayLinks);
}
};

module.exports = getLinks;
