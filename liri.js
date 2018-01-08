require("dotenv").config();
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

        for (i = 0; i < data.length; i++) {
            console.log(data[i].text)
            fs.appendFile("log.txt", data[i].text + "\n", function (errorTwo) {
                if (errorTwo)
                    console.log(errorTwo);
            });
        }
    });
}