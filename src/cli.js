#!/usr/bin/env node
const process = require("process");
const mdLinks = require("./index.js");
const chalk = require("chalk");
const figlet = require("figlet");

const header = () =>  {
  return new Promise((resolve, reject) => {
 figlet.text(' Welcome to MD-LINKS ', {
  width: 100,
  whitespaceBreak: true
}, function(err, data) {
  if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      reject(err);
  }
  resolve(console.log(chalk.bgYellow.magenta.bold(data)));
});
  });
}

const instructions = `

  ${chalk.cyanBright.bold("\nINSTRUCTIONS \n")}
  1. If you want to know information about the links such as url and text enter the command md-links along with the path you want to query. 

  This way: ${chalk.bgWhite.black.bold(' md-links ./some/example.md \n')}

  2. If you want to know if the links work or are broken, in addition to the previous step, enter the --validate command.

  This way: ${chalk.bgWhite.black.bold(' md-links ./some/example.md --validate \n')}  

  3. If you want to know the number of links and the number of unique links, in addition to the first step, enter the --stats command.

  This way: ${chalk.bgWhite.black.bold(' md-links ./some/example.md --stats \n')}

  4. If you want to know the number of links, unique links and broken links, in addition to the first step, enter the --stats-and-validate command.

  This way: ${chalk.bgWhite.black.bold(' md-links ./some/example.md --validate --stats \n')}
  `;

  if(process.argv.length < 3){
  header().then(() => {
     console.log(chalk.green.bold(instructions));
  });
}

let args = process.argv;


// Comportamiento por defecto de la función, si no se ingresa una opción
const defaultOption = () => {
  mdLinks(args[2], { validate: false })
    .then((links) => {
      console.log(links);
      if(links.length !== 0){
      console.group(chalk.cyanBright.bold("\n\n LINKS ENCONTRADOS \n"));
      links.forEach((link) => {
        if (typeof link === "object") {
          console.log(
            "\n",
            "✔️ ",
            chalk.magentaBright(link.file),
            link.text,
            chalk.yellowBright(link.href)
          );
        }
      });
      console.groupEnd();
    }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Comportamiento de la función, si se ingresa opción --validate

const validateOption = () => {
  
  mdLinks(args[2], { validate: true })
    .then((links) => {
      console.log
      if(links.length !== 0){
      console.group(
        chalk.cyanBright.bold("\n Links encontrados y validados \n")
      );
      links.forEach((link) => {
        if (typeof link === "object") {
          if (link.ok === "OK")
            link.ok = chalk.green.bold(link.ok, link.status);
          else link.ok = chalk.red.bold(link.ok, link.status);
          console.log(
            "\n",
            "✔️ ",
            chalk.magentaBright(link.file),
            chalk.yellowBright(link.href),
            link.ok,
            link.text
          );
        }
      });
      console.groupEnd();
    }
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
  mdLinks(args[2], { validate: false })
    .then((links) => {
      if(links.length !== 0){
      console.group(
        chalk.cyanBright.bold(
          "\n Estadísticas sobre los links encontrados en los archivos .md \n"
        )
      );
      numOfLinks = links.length;

      links.forEach((link) => {
        if (typeof link === "object") uniqLinks.push(link.href);
      });
      uniqLinks = [...new Set(uniqLinks)];
      numOfUniqLinks = uniqLinks.length;
      console.log("✔️ Total:", numOfLinks, "\n✔️ Unique:", numOfUniqLinks);
      console.groupEnd();
    }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Comportamiento de la función, si se ingresa opción --stats --validate
let numBrokenLinks = 0;
const statsAndValidateOption = () => {
  mdLinks(args[2], { validate: true })
    .then((links) => {
      if(links.length !== 0){
      console.group(
        chalk.cyanBright.bold(
          "\n Estadísticas sobre los links encontrados en los archivos .md \n"
        )
      );
      numOfLinks = links.length;
      links.forEach((link) => {
        if (typeof link === "object") {
          uniqLinks.push(link.href);
          if (link.ok === "FAIL") {
            numBrokenLinks++;
          }
        }
      });
      uniqLinks = [...new Set(uniqLinks)];
      numOfUniqLinks = uniqLinks.length;
      console.log(
        "✔️  Total:",
        numOfLinks,
        "\n✔️  Unique:",
        numOfUniqLinks,
        "\n❌ Broken:",
        numBrokenLinks
      );
      console.groupEnd();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};


// De acuerdo a la opción ingresada por el usuario, se ejecuta una función u otra
if(args.includes("--validate") && args.includes("--stats") || args.includes("--stats-and-validate")){
  statsAndValidateOption();
} else if(args.includes("--validate")){
  validateOption();
} else if(args.includes("--stats")){
  statsOption();
} else {
  defaultOption();
}
