const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}:${req.url} New request received\n`;
  const myUrl = url.parse(req.url, true);

  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Home Page");
        break;
      case "/about":
        const username = myUrl.query.myname;
        res.end(`This is ${username}`);
        break;
      default:
        res.end("404 page not found");
    }
  });
});

myServer.listen(8000, () => console.log("server started"));
