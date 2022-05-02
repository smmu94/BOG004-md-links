#!/usr/bin/env node
const process = require("process");
const mdLinks = require("./index.js");
const chalk = require("chalk");
let args = process.argv;

// Comportamiento por defecto de la función, si no se ingresa una opción
const defaultOption = () => {
  mdLinks(args[2], args[3])
    .then((links) => {
      console.group("Links encontrados");
      links.forEach((link) => {
        if (typeof link === "object") {
          console.group("\n Archivo: " + link[0].file, "\n");
          for (let item of link) {
            console.log(
              chalk.bgYellowBright.black(item.file),
              item.text,
              item.href
            );
          }
          console.groupEnd();
        }
      });
      console.groupEnd();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Comportamiento de la función, si se ingresa opción --validate

const validateOption = () => {
  mdLinks(args[2], args[3])
    .then((links) => {
      console.group("Links encontrados y validados \n");
      links.forEach((link) => {
        if (typeof link === "object") {
          console.group("\n Archivo: " + link[0].file, "\n");
          for (let item of link) {
            console.log(
              chalk.bgYellowBright.black(item.file),
              chalk.bgCyanBright.black(item.href),
              chalk.bgRedBright(item.ok, item.status),
              chalk.bgBlack(item.text),
              "\n"
            );
          }
        }
        console.groupEnd();
      });
      console.groupEnd();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Comportamiento de la función, si se ingresa opción --stats
let numOfLinks = 0;
let numOfUniqLinks = 0;
let uniqLinks = [];
const statsOption = () => {
  mdLinks(args[2], args[3])
    .then((links) => {
      console.group(
        "\n Estadísticas sobre los links encontrados en cada archivo .md \n"
      );
      links.forEach((link) => {
        if (typeof link === "object") {
          numOfLinks = link.length;
          uniqLinks = [...new Set(link.map((item) => item.href))];
          numOfUniqLinks = uniqLinks.length;
          console.group("Archivo: " + link[0].file);
          console.log("Total:", numOfLinks, "\nUnique:", numOfUniqLinks);
          console.groupEnd();
        }
      });
      console.groupEnd();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Comportamiento de la función, si se ingresa opción --stats --validate
let numBrokenLinks = 0;
const statsAndValidateOption = () => {
  mdLinks(args[2], args[3])
    .then((links) => {
      console.group(
        "\n Estadísticas sobre los links encontrados en cada archivo .md \n"
      );
      links.forEach((link) => {
        if (typeof link === "object") {
          for (let item of link) {
            if (item.status === "FAIL") numBrokenLinks++;
          }
          numOfLinks = link.length;
          uniqLinks = [...new Set(link.map((item) => item.href))];
          numOfUniqLinks = uniqLinks.length;
          console.group("Archivo: " + link[0].file);
          console.log(
            "Total:",
            numOfLinks,
            "\nUnique:",
            numOfUniqLinks,
            "\nBroken:",
            numBrokenLinks
          );
          console.groupEnd();
        }
      });
      console.groupEnd();
    })
    .catch((err) => {
      console.log(err);
    });
};

// De acuerdo a la opción ingresada por el usuario, se ejecuta una función u otra
switch (args[3] + " " + args[4]) {
  case "--validate" + " " + undefined:
    validateOption();
    break;
  case "--stats" + " " + undefined:
    statsOption();
    break;
  case "--stats --validate":
    statsAndValidateOption();
    break;
  default:
    defaultOption();
    break;
}
