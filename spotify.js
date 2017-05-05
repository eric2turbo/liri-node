var spotify = require('spotify');
var fs = require("fs");

var song = "The Way";
var theWay = "0hrBpAOgrt8RXigk83LLNE";

if (process.argv.length > 2) {
	song = process.argv[2];
}

spotify.lookup({ type: 'track', id: theWay }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    // Do something with 'data' 
    console.log(JSON.stringify(data));
    fs.writeFile("data.txt", JSON.stringify(data));
});