var fs = require("fs");

// command
var input = process.argv[2];

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