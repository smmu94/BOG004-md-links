const { marked } = require("marked");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const validateLinks = require("./validateLinks");
const path = require("path");

const process = require("process");

const onelink = {
  href: "",
  text: "",
  file: "",
};
// Funcion para obtener los links de un archivo .md

const getLinks = (data, file, options) => {
  file = path.relative(process.cwd(), file);
  file = './' + file;
  let arraylink = [];
  let html = marked(data);
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const links = document.querySelectorAll("a");
  if (links.length === 0)
    return (arraylink = `El archivo ${file} no contiene links`);
  else {
    links.forEach((link) => {
      if (link.href.includes("http")) {
        link.text.length >50 ? (link.text = link.text.substring(0,50) + '...') : link.text;
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
          return validateLinks(link.href)
            .then((res) => {
              link.status = res.status;
              link.ok = "OK";
              return link;
            })
            .catch((err) => {
              link.status = err.response.status;
              link.ok = "FAIL";
              return link;
            });
        })
      ).then((links) => {
        return links;
      });
    } else {
      return arraylink;
    }
  }
};

module.exports = getLinks;
