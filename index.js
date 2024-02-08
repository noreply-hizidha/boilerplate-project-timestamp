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
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


app.get('/api/:date?', (req, res) => {
  let dateInput = req.params.date;
  let timestamp;
  let unixTimestamp;
  let utcDateString;

  if (!dateInput){
    dateInput = new Date();
  } else {
    timestamp = parseInt(dateInput);
    dateInput = new Date(dateInput);
  }

  if (!isNaN(dateInput.getTime())) {
    unixTimestamp = dateInput.getTime();
    utcDateString = dateInput.toUTCString();
    
    res.json({ unix: unixTimestamp, utc: utcDateString });
  } else if (!isNaN(timestamp)) {
    unixTimestamp = timestamp;
    utcDateString = new Date(timestamp).toUTCString();

    res.json({ unix: unixTimestamp, utc: utcDateString });
  } else {
    res.json({ error: "Invalid Date" });
  }
});