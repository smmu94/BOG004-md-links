const axios = require("axios");

const validateLinks = (link) => {
  return new Promise((resolve, reject) => {
    axios
      .get(link)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = validateLinks;
