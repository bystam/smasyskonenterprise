var express = require('express');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded());

app.get('/', function(req, res) {
	res.render('mission', {
		title : 'Småsyskonöverlämning 2014',
		id : 1
    });
});

var validateMissionPassphase = function (req, callback) {
	var result = {};
	if (req.body.passphrase === 'lolfi golfi') {
		result.url = "google.com";
	} else {
		result.url = "felsomfan.se";
	}
	callback(result);
}

app.post('/', function (req, res) {
	validateMissionPassphase(req, function (result) {
		console.log(result.url);
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on port: " + port);
});