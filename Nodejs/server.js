const http = require("http");
const fs = require("fs");
const path = require("path");
const { logEvent } = require("./logapp");
const PORT = 9500;

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fs.promises.readFile(
            filePath,
            !contentType.includes('image') ? 'utf8' : ''
        );
        response.end(rawData);
    }
    catch (err) {
        console.log(err);
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
  console.log(`Request = ${req.url}, \n Response = ${req.method}`);
  let contentType = "text/html";
  let extension = path.extname(req.url);
  if(req.url == '/') req.url = "/index.html"
  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;

    case ".js":
      contentType = "text/javascript";
      break;

    case ".json":
      contentType = "application/json";
      break;

    case ".jpeg" || ".jpg":
      contentType = "image/jpeg";
      break;

    case ".html":
      contentType = "text/html";
      break;

    case ".txt":
      contentType = "text/plain";
      break;

    default:
      contentType = "text/html";
      break;
  }
  res.setHeader("Content-Type", contentType);
  const filepath = path.join(__dirname, "view", req.url);
  const exists = fs.existsSync(filepath);
  console.log(filepath);
  console.log("exists = ",exists);
  if (exists) {
    res.statusCode = 200; 
    serveFile(filepath, contentType, res);
  } 
  else {
    switch(req.url)
    {
        case "/old-page.html":
            console.log("came to old page");
            res.setHeader("Location", "/new-page.html");
            res.statusCode = 301;
            res.end();
            break;
        case '/www-page.html':
            res.setHeader("Location", "/index.html");
            res.statusCode = 301;
            res.end();
            break;
        default:
            res.statusCode = 404;
            serveFile(path.join(__dirname, "view", "404.html"), contentType, res);
            break;
    }
    //404 error

  }
  // fs.readFile(filepath, "utf8", function (err, data) {
  //   if (!err) {
  //     console.log("not error");
  //     res.end(data);
  //   }
});

server.listen(PORT, () => {
  console.log(`Server running on PORT:${PORT}`);
  logEvent(`Server running on PORT:${PORT}`);
});
