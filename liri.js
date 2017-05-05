//get twitter keys
var twitterkeys = require("./keys.js");
var fs = require("fs");
var action = process.argv[2];

switch(action) {
	case "my-tweets":
		mytweets();
		break;

	case "spotify-this-song":
		spotifythissong();
		break;

	case "movie-this":
		moviethis();
		break;

	// case "do-what-it-says":
	// 	do-what-it-says();
	// 	break;
	
}

//my-tweets
var twitter = require('twitter');


function mytweets() {
	var twitterkeys = require("./keys.js");
	var fs = require("fs");
	var action = process.argv[2];

	var twitter = require('twitter');
	var params = {screen_name: 'nodejs', count: 5 };
	var results = [];

	var client = new twitter(twitterkeys.twitterkeys);

	client.get('https://api.twitter.com/1.1/statuses/user_timeline.json', {count: 20}, function(error, tweets, response) {
		
		tweets.forEach(function(arg) {
			console.log("Time: " + arg.created_at + " Tweet: " + arg.text);
		});

	});
}

//spotify-this-song
function spotifythissong() {

}

// movie-this
function moviethis() {
	var request = require("request");

	var nodeArgs = process.argv;
	var movieName = "Mr+Nobody";

	// Change start to 3 for liri
	if (process.argv.length > 3) {
		movieName = "";
		for (var i = 3; i < nodeArgs.length; i++) {
			if (i > 3 && i < nodeArgs.length) {
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
		// var rottenTitle = movieName.replace(/\+/g, "_");
		var newTitle = '';
		for (var i=0; i<title.length;i++) {
			if (["'", ".", ",", "-"].indexOf(title[i]) === -1) {
				newTitle += title[i];
			}
		}
		var rottenTitle = newTitle.replace(/\s/g, "_");
		console.log("*https://www.rottentomatoes.com/m/" + rottenTitle + "/");

	});

}

// do-what-it-says
function dowhatitsays() {

}