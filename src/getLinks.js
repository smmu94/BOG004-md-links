const { marked } = require("marked");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const validateLinks = require("./validateLinks");

const onelink = {
  href: "",
  text: "",
  file: "",
};
// Funcion para obtener los links de un archivo .md

const getLinks = (data, file, options) => {
  let arraylink = [];
  let html = marked(data);
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const links = document.querySelectorAll("a");
  if (links.length === 0)
    return console.error("No hay links en el archivo " + file);
  else {
    links.forEach((link) => {
      if (link.href.includes("http")) {
        let newLink = Object.create(onelink);
        newLink.href = link.href;
        newLink.text = link.text;
        newLink.file = file;
        arraylink.push(newLink);
      }
    });
    if (options === "--validate") {
      return Promise.all(
        arraylink.map((link) => {
          return validateLinks(link.href).then((res) => {
            link.status = res.status;
            link.ok = "OK";
            return link;
          }).catch((err) => {
            link.status = err.response.status;
            link.ok = "FAIL";
            return link;
          });
        })
      ).then((links) => {
        return links;
      });
    }
  }
};

module.exports = getLinks;
