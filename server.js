// const express = require("express");
// const app = express();
// const port = 8080;

// app.get("/", (req, res) => {
//   res.send("<h1>Hello World!</h1>");
// });

// app.listen(port, function () {
//   console.log(`Example app listening on port ${port}!`);
// });

// ABOVE EXAMPLE FROM EXPRESSJS.COM //


const express = require('express');

express()
  .get('/', onhome)
  .listen(8080, function () {
    console.log(`My new first server hosted on port 8080!`);
  })

function onhome(req, res) {
  res.send('<h1>Hello World!</h1>');
}

// HERE OWN VERSION //