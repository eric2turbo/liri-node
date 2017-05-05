var request = require("request");

var nodeArgs = process.argv;
var movieName = "Mr+Nobody";

// Change start to 3 for liri
if (process.argv.length > 3) {
	for (var i = 2; i < nodeArgs.length; i++) {
		if (i > 2 && i < nodeArgs.length) {
			movieName = movieName + "+" + nodeArgs[i];
		}
		else {
			movieName += nodeArgs[i];
		}
	}
} 

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json";

request(queryUrl, function(error, response, body) {
	var movie = JSON.parse(body);
	var title = movie.Title;
	console.log("*" + title);
	console.log("*" + movie.Year);
	console.log("*" + movie.imdbRating);
	console.log("*" + movie.Country);
	console.log("*" + movie.Language);
	console.log("*" + movie.Plot);
	console.log("*" + movie.Actors);
	//var rottenTitle = movieName.replace(/\+/g, "_");
	var rottenTitle = '';
	for (var i=0; i<title.length;i++) {
		if (["'", ".", ",", "-"].indexof(title[i]) === -1) {
			rottenTitle += title[i];
		}
	}

	console.log("* https://www.rottentomatoes.com/m/" + rottenTitle + "/");

});