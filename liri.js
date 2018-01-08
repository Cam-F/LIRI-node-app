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

// Movie function
function getMovie() {
    var movieSearch = search;

    if (movieSearch === "") {
        movieSearch = "Mr. Nobody";
    }

    request("http://omdbapi.com/?t=" + movieSearch + "&y=&plot=short&tomatoes=true&apikey=trilogy", function (error, response, body) {

        if (!error && response.statusCode === 200) {

            // console.log(JSON.parse(body));
            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log(JSON.parse(body).imdbRating);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);
            console.log(JSON.parse(body).tomatoRating);

            // appending to log.txt
            fs.appendFile("log.txt", "Title: " + JSON.parse(body).Title + "\n", function (error){
                if (error) throw (error);
            });
            fs.appendFile("log.txt", "Year: " + JSON.parse(body).Year + "\n", function (error){
                if (error) throw (error);
            });
            fs.appendFile("log.txt", "IMDB Rating: " + JSON.parse(body).imdbRating + "\n", function (error){
                if (error) throw (error);
            });
            fs.appendFile("log.txt", "Country: " + JSON.parse(body).Country + "\n", function (error){
                if (error) throw (error);
            });
            fs.appendFile("log.txt", "Language: " + JSON.parse(body).Language + "\n", function (error){
                if (error) throw (error);
            });
            fs.appendFile("log.txt", "Plot: " + JSON.parse(body).Plot + "\n", function (error){
                if (error) throw (error);
            });
            fs.appendFile("log.txt", "Actors: " + JSON.parse(body).Actors + "\n", function (error){
                if (error) throw (error);
            });
            fs.appendFile("log.txt", "Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating + "\n", function (error){
                if (error) throw (error);
            });
        }
    })
}