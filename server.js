var http = require('http');
var _ = require('lodash');

var url_campbell = 'http://metadata.helmet-kirjasto.fi/search/author.json?query=Campbell';
var url_rowling = 'http://metadata.helmet-kirjasto.fi/search/author.json?query=Rowling';
var books_campbell = [];
var books_rowling = [];

http.get(url_campbell, function(res){
	var body = "";

	res.on("data", function (chunk) {
		body += chunk;
	});

	res.on("end", function(){
		var authorRes = JSON.parse(body);
		for (var i = 0; i < authorRes.records.length; i++){
			var title = authorRes.records[i].title;
			var year = authorRes.records[i].year;
			books_campbell.push({displayName: title, year: year});
		};
	});
});

http.get(url_rowling, function(res){
	var body = "";

	res.on("data", function (chunk) {
		body += chunk;
	});

	res.on("end", function(){
		var authorRes = JSON.parse(body);
		for (var i = 0; i < authorRes.records.length; i++){
			var title = authorRes.records[i].title;
			var year = authorRes.records[i].year;
			books_rowling.push({displayName: title, year: year});
		};
	});
});

console.log('hei kaikki ihanat!');

for(var i = 0; i < books_campbell.length; i++){
    console.log(books_campbell[i].displayName + " , " + books_campbell[i].year);
};
for(var i = 0; i < books_rowling.length; i++){
    console.log(books_rowling[i].displayName + " , " + books_rowling[i].year);
};