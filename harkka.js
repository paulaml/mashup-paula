var http = require('http');
var _ = require('lodash');
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db){
    if(err){
        return console.dir(err);
    }
    var collection = db.collection('test');
    var doc = {mykey:1, fieldtoupdate:1};

    db.createCollection('test', {w:1}, function(err, collection) {});
});

var url = 'http://metadata.helmet-kirjasto.fi/search/author.json?query=Campbell';

http.get(url, function(res) {
    var books = [];
    var body = "";

    res.on("data", function(chunk) {
        body += chunk;
    });

    res.on("end", function() {

        var authorRes = JSON.parse(body);

        for (var i = 0; i < authorRes.records.length; i++) {
        	var title = authorRes.records[i].title;
        	var year = authorRes.records[i].year;
            books.push({displayName: title, year: year});
        	console.log(title, ", ", year);
            /*collection.insert(doc, {w:1}, function(err, result){
                collection.update({mykey:1}, {$set:{fieldtoupdate:2}}, {w:1}, 
                    function(err, result){});
            });*/
        };
       /* for(var i = 0; i < books.length; i++){
            if(parseInt(books[i].year) === 2012){
                console.log(books[i].displayName + " , " + books[i].year);
            }
        };*/

    });

}).on("error", function(e) {
      console.log("Error: ", e);
});