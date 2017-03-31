const config = require("./config");

const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
    function notFound() {
        response.writeHead(404);
        response.end('Resource not found.\n');
        response.end();
    }

    function getMimeType(ext) {
        var mime = config.defaultMimeType;
        for (type in config.mimeTypes)
            if (config.mimeTypes[type].indexOf(ext) != -1)
                mime = type;

        return mime;
    }

    var virtualPath = request.url;

    if (virtualPath == "/" && config.defaultDocument)
        virtualPath = "/" + config.defaultDocument;

    var filePath = config.root + virtualPath;
    var contentType = getMimeType(path.extname(filePath));

    if (fs.existsSync(filePath))
        fs.readFile(filePath, function (error, content) {
            if (error) {
                if (error.code == 'ENOENT') {
                    notFound();
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                    response.end();
                }
            }
            else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
    else
        notFound();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});