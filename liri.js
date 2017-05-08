//get twitter keys
var twitterkeys = require("./keys.js");

var fs = require("fs");
var spotify = require('spotify');
var twitter = require('twitter');
var request = require("request");

var action = process.argv[2];
var media = "";

if (process.argv.length > 3) {
    media = process.argv[3];
    media = media.replace(/\s/g, '+');
    //console.log("starting media is " + media);
}

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
    if (media === "") {
        media = "the+sign+ace";
    }

    spotify.search({ type: 'track', query: media }, function(err, data) {
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
        } else if (data.tracks.total === 0) {
            spotify.search({ type: 'track', query: "the+sign+ace" }, function(err, data) {
                //console.log("newdata: " + JSON.stringify(data, null, 2));
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

    // Default movie 
    if (media === "") {
        //console.log("replaced by default");
        media = "Mr+Nobody";
    }


    var queryUrl = "http://www.omdbapi.com/?t=" + media + "&y=&plot=short&tomatoes=true&r=json";
    console.log(queryUrl);
    request(queryUrl, function(error, response, body) {
        var movie = JSON.parse(body);
        //If movie not found, skip to else.  Otherwise list information
        if (movie.Error === "Movie not found!") {
            queryUrl = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&tomatoes=true&r=json";
            request(queryUrl, function(error, response, body) {
                movie = JSON.parse(body);
                console.log("*Title: " + movie.Title);
                console.log("*Year: " + movie.Year);
                console.log("*IMDB Rating: " + movie.imdbRating);
                console.log("*Country: " + movie.Country);
                console.log("*Language: " + movie.Language);
                console.log("*Plot: " + movie.Plot);
                console.log("*Actors: " + movie.Actors);
                console.log("*Rottentomatoes URL: " + movie.tomatoURL);
            });

        } else {
            console.log("Could not find the movie.  Try this one: ");

            movie = JSON.parse(body);
            console.log("*Title: " + movie.Title);
            console.log("*Year: " + movie.Year);
            console.log("*IMDB Rating: " + movie.imdbRating);
            console.log("*Country: " + movie.Country);
            console.log("*Language: " + movie.Language);
            console.log("*Plot: " + movie.Plot);
            console.log("*Actors: " + movie.Actors);
            console.log("*Rottentomatoes URL: " + movie.tomatoURL);

        }
    });

}

// do-what-it-says
function dowhatitsays() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        var dataArr = data.split(',');
        var randomAction = dataArr[0];

        //check if there is an argument then set media and add pluses
        if (dataArr.length > 1) {
            media = dataArr[1];
            media = media.replace(/\s/g, '+');
            console.log("media dwis is: " + media);
        } else {
            media = "";
        }

        switch (randomAction) {
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

    });
}