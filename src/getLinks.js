const { marked } = require("marked");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// 7) Funcion para obtener los links de un archivo .md

let html = '';
let arrayLinks = [];
const getLinks = (data) => {
  html += marked(data);
  console.log(html)
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    arrayLinks.push(link.href);
  });
  console.log(arrayLinks);
};

module.exports = getLinks;