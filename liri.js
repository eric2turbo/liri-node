//get twitter keys
var twitterkeys = require("./keys.js");
var fs = require("fs");
var spotify = require('spotify');
var twitter = require('twitter');
var action = process.argv[2];

switch (action) {
    case "my-tweets":
        mytweets();
        break;

    case "spotify-this-song":
        spotifythissong();
        break;

    case "movie-this":
        moviethis();
        break;

    case "do-what-it-says":
        dowhatitsays();
        break;

}

//my-tweets

function mytweets() {

    var params = { screen_name: 'nodejs', count: 5 };
    var results = [];

    var client = new twitter(twitterkeys.twitterkeys);

    client.get('https://api.twitter.com/1.1/statuses/user_timeline.json', { count: 20 }, function(error, tweets, response) {

        tweets.forEach(function(arg) {
            console.log("Time: " + arg.created_at + " Tweet: " + arg.text);
        });

    });
}

//spotify-this-song

function spotifythissong() {
    // if command input array length bigger than 3
    var song = "the sign ace of bass";
    if (process.argv.length > 3) {
        var song = process.argv[3];
        song.replace(/\s/g, '+');
    }

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        if (data.tracks.total > 0) {
            // Do something with 'data' 
            //fs.writeFile("spotsearch.txt", JSON.stringify(data, null, 2));

            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview Link: " + data.tracks.items[0].preview_url);
        } else {
            spotify.search({ type: 'track', query: "the+sign+ace+of+bass" }, function(err, data) {
                console.log("Here is a song since spotify can't find your choice");
                console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
                console.log("Song: " + data.tracks.items[0].name);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("Preview Link: " + data.tracks.items[0].preview_url);
            });
        }
    });
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
            } else {
                movieName += nodeArgs[i];
            }
        }
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&r=json";

    request(queryUrl, function(error, response, body) {
        var movie = JSON.parse(body);

        console.log("*" + title);
        console.log("*" + movie.Year);
        console.log("*" + movie.imdbRating);
        console.log("*" + movie.Country);
        console.log("*" + movie.Language);
        console.log("*" + movie.Plot);
        console.log("*" + movie.Actors);
        console.log("*" + movie.tomatoURL);

    });

}

// do-what-it-says
function dowhatitsays() {

}