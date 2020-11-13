var http=require("http");
var fs=require("fs");
var url=require("url");
var path = require("path");

/*var server=http.createServer(function(req,res){
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.write("<html><head><title>Es1 Server</title></head>");
    res.write("<body>\nQuesto è un server web Node");
    res.write("\n<p>Testo scritto tramite l'utilizzo di una function implicita alla createServer");
    res.end("</body></html>");  
});

server.listen(8888,"127.0.0.1");*/

var server=http.createServer(crea);
server.listen(8888,"127.0.0.1");
console.log("Server running on port 8888...");

function crea(req, res){
    var risorsa=(url.parse(req.url)).pathname;
    console.log("Risorsa --> " + risorsa);
    switch(risorsa){
        case '/':
        case '/index.html':
            res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            res.write("<html><head><title>Es1 Server</title>");
            res.write("<link rel='stylesheet' href='index.css' /><link rel='stylesheet' href='css/bootstrap.css' /></head>");
            res.write("<script src='js/jquery.js'></script><script src='js/index.js'></script>")
            res.write("<link rel='icon' sizes='32x32' href='favicon.ico' />");
            res.write("<body>Questo è un server web Node");
            res.write("<h1>Testo scritto tramite l'utilizzo di una function esterna alla createServer</h1>");
            res.write("<p id='par'>Paragrafo di testo formattato tramite css</p>");
            res.write("<form action='/p2' method='post'><input type='submit' value='Redirect to Pag 2' class='btn btn-primary' /></form>");
            res.write("<input type='button' value='Vai a p3' class='btn btn-danger' id='btnP3' />")
            res.end("</body></html>");  
            break;
        case '/p2':
            fs.readFile("./pag2.html","utf8",function(err,content){
                if(!err){
                    var header={"Content-Type":"text/html;charset=utf-8"};
                    res.writeHead(200,header);
                    res.write(content);
                    res.end("<a href='/' class='btn btn-danger'>Torna alla Home</a>");
                }
                else
                    pageNotFound(res);
            });
            break;
        case '/pag3.html':
            fs.readFile("./pag3.html","utf8",function(err,content){
                if(!err){
                    var header={"Content-Type":"text/html;charset=utf-8"};
                    res.writeHead(200,header);
                    res.write(content);
                    res.end("<a href='/' class='btn btn-danger'>Torna alla Home</a>");
                }
                else
                    pageNotFound(res);
            });
            break;
        default: //qui gestiamo le risorse "di contorno"

            var extName = path.extname(risorsa);
            console.log("Risorsa richiesta: " + risorsa)
            console.log("Ext: " + extName);
            console.log("Risorsa richiamata (percorso escluso): " + path.basename(risorsa));
            console.log("Cartella della risorsa: " + path.dirname(risorsa));

            switch(extName){
                case '.css':
                    res.writeHead(200, {"Content-Type":"text/css;charset=UTF-8"});
                    res.end(fs.readFileSync("."+risorsa));
                    break;
                case '.js':
                    res.writeHead(200, {"Content-Type":"text/javascript;charset=UTF-8"});
                    res.end(fs.readFileSync("."+risorsa));
                    break;
                case '.ico':
                    res.writeHead(200, {"Content-Type":"image/png"});
                    res.end(fs.readFileSync("."+risorsa));
                    break;
                default:
                    pageNotFound(res);
            }
            break;
    }
}

function pageNotFound(res){
    var header={"Content-Type":"text/html;charset=utf-8"};
    res.writeHead(404, header);
    res.end(fs.readFileSync("./error.html"),"utf8");
}