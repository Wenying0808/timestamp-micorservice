// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let dateParam = req.params.date;
  let date;
  let unixDate;
  let utcDate;


  let isUnix = /^\d+$/.test(dateParam);

  if (!dateParam) {
    date = new Date();
  } else if (isUnix) {
    // if input date is unix string
    dateParam = parseInt(dateParam);
    date = new Date(dateParam);
  } else if (!isUnix) {
    date = new Date(dateParam);
  }
  unixDate = date.getTime();
  utcDate = date.toUTCString();

  if ( utcDate === "Invalid Date") {
    res.json({
      error : "Invalid Date"
    });
  } else {
    res.json({
      unix: unixDate, // ms
      utc: utcDate,
    });
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
