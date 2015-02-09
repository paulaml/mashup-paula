var http = require("http");

function onRequest(request, response){
	console.log("Pyyntö vastaanotettu.");
	response.writeHead(200,{"Content-Type" : "text/plain"});
	response.write("Moi maailma!");
	response.end();
}

http.createServer(onRequest).listen(8888);

console.log("Palvelin on käynnistetty.");