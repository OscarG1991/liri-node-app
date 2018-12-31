require('dotenv').config();
var axios = require("axios");
var keys = require("./Keys.js");
var request = require("request");
var moment = require('moment');
var Spotify = require('node-spotify-api');
var Spotify1 = new Spotify(keys.Keys.spotify);


var input1 = process.argv[2];
var input2 = process.argv.slice(3).join(" ");

var outputBands;

if (process.argv[2] == "concert-this" ) {
    console.log(input2);
    if (!input2) {input2 = "Metallica";}
   
    var outputBands = "https://rest.bandsintown.com/artists/" + input2 + "/events?app_id=codingbootcamp";

    request(outputBands, function (error, response, body) {
       if (!error && response.statusCode === 200){ 
        let result  =  JSON.parse(body);
        if (result.length > 0) {
            for (i=0; i < 1; i++){
        
        console.log("Venue name " + result[0].venue.name);
        console.log("Venue location " + result[0].venue.city);
        console.log("Date of Event " +  moment(result[0].datetime).format("MM/DD/YYYY"));
        };    
       }
       else {
            console.log("Currently not on Tour");
       };
        }; 
    });
}
if (process.argv[2] == "spotify-this-song") {
    console.log(input2);
  if (!input2) {input2 = "The Sign";}

  Spotify1.search({ type: 'track', query: input2, limit: '1'}, function(err, data) {
    
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    var result = {
      "Band name: " : data.tracks.items[0].album.artists[0].name,
      "Song name: " : data.tracks.items[0].name,
      "preview_url: " : data.tracks.items[0].preview_url,
      "Album name: " : data.tracks.items[0].album.name
    }
    console.log(result);
  });
  }
  

if (process.argv[2] == "movie-this") {
    console.log(input2);

    if (!input2) {input2 = "Mr. Nobody";}
  axios.get("http://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
      
      var result = {
        "Title: " : response.data.Title,
        "Year: " : response.data.Year,
        "imdbRating: " : response.data.imdbRating,
        "Rotten Tomatoes Rating: " : response.data.Ratings ? response.data.Ratings[1].Value : "",
        "Country: " : response.data.Country,
        "Language: " : response.data.Language,
        "Plot: " : response.data.Plot,
        "Actors: " : response.data.Actors
      }
      console.log(result);
    },
    function(error){
      console.log("error", error);
  });
  }








    
        