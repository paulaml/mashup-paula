var http = require('http');
var _ = require('lodash');

var statusHtml = "<html><body>ei onnistu</body></html>";

http.createServer(function(req,res) { 
	res.writeHead(200, {'content-type': 'text/plain'});
	res.end('hello world\n');
}).listen(1024, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

var booksUrl = 'http://metadata.helmet-kirjasto.fi/search/author.json?query=Campbell';

console.log("List of books coming...");
http.get(booksUrl, function(res) {
	var body = "";

	res.on("data", function(chunk){
		body += chunk;
	});

	res.on ("end", function(){
		var bookList = _.map(JSON.parse(body).records, function(d){
			return {
				displayName: d.title,
				year: d.year
			};
		});

		console.log("List of books: ", bookList);

		satusHtml = "<html><body>";
		_.map(bookList, function(d){
			statusHtml += "<h1>" + d.displayName + "</h1>";
			statusHtml += "<p>" + d.year + "</p>";
		});

		statusHtml += "</body></html>";

	});
}).on("error", function(e){
	console.log("Error: ", e);
});

