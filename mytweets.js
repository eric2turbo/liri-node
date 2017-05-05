
var twitterkeys = require("./keys.js");
var fs = require("fs");
var action = process.argv[2];

var twitter = require('twitter');
var params = {screen_name: 'nodejs', count: 5 };
var results = [];

console.log(twitterkeys.twitterkeys);


var client = new twitter(twitterkeys.twitterkeys);

client.get('https://api.twitter.com/1.1/statuses/user_timeline.json', {count: 20}, function(error, tweets, response) {
	console.log(tweets);
	tweets.forEach(function(arg) {
		console.log("Time: " + arg.created_at + " Tweet: " + arg.text);
	});

});