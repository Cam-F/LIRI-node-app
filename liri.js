require("dotenv").config();
var fs = require("fs");
var request = require("request");

// command
var input = process.argv[2];
var search = "";
//loop to combine the multi word searches
for (i = 3; i < process.argv.length; i++) {
    search += (process.argv[i] + "+");
}

// switch
switch (input) {
    case "my-tweets":
        getTwitter();
        break;

    case "spotify-this-song":
        getSpotify();
        break;

    case "movie-this":
        getMovie();
        break;

    case "do-what-it-says":
        doWhat();
        break;
}

// twitter function

function getTwitter() {
    var Twitter = require("twitter");
    var keys = require("./keys.js");
    var client = new Twitter(keys.twitter);

    var params = {
        screen_name: "_lux__",
        count: 20
    };

    client.get('statuses/user_timeline', params, function (error, data) {
        if (error);
        console.log(error);

        fs.appendFile("log.txt", "----- My Tweets -----\n");

        for (i = 0; i < data.length; i++) {
            console.log(data[i].text)
            fs.appendFile("log.txt", data[i].text + "\n", function (errorTwo) {
                if (errorTwo)
                    console.log(errorTwo);
            });
        }
    });
}

// spotify function

function getSpotify() {

    // search convert
    if (search == "") {
        var songSearch = "The Sign artist:Ace of Base";
    } else {
        var songSearch = '"' + search + '"';
    }

    var Spotify = require("node-spotify-api");
    var keys = require("./keys.js");
    var spotify = new Spotify({
        id: '44a477d02589470c8f5a2dabb2e735cf',
        secret: '7c8d4557151c40509a622270d14e4284'
    });

    // searching the spotify api
    spotify.search({ type: 'track', query: songSearch, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // console logs song info
        var songInfo = data.tracks.items[0];
        console.log("Artist: ", songInfo.artists[0].name);
        console.log("Song: ", songInfo.name);
        console.log("Preview Link: ", songInfo.preview_url);
        console.log("Album: ", songInfo.album.name);

        // appending to log.txt
        fs.appendFile("log.txt", "----- Spotify -----\n", function (error) {
            if (error) throw error;
        });
        fs.appendFile("log.txt", "Artist: " + songInfo.artists[0].name + "\n", function (error) {
            if (error) throw error;
        });
        fs.appendFile("log.txt", "Song: " + songInfo.name + "\n", function (error) {
            if (error) throw error;
        });
        fs.appendFile("log.txt", "Preview Link: " + songInfo.preview_url + "\n", function (error) {
            if (error) throw error;
        });
        fs.appendFile("log.txt", "Album: " + songInfo.album.name + "\n", function (error) {
            if (error) throw error;
        });
    });
}