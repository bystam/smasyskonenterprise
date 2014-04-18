var express = require('express');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded());


var firstMission = {
	title : 'Fysikens jag',
	missionurl: 'http://www.youtube.com/embed/ee925OTFBCA',
	passphrase : 'lolfi golfi',
	id : 1
};

var secondMission = {
	title : 'Visdomskammaren',
	missionurl : '//www.youtube.com/embed/pTZ2Tp9yXyM',
	passphrase : 'snuttefilt',
	id : 2
};

var thirdMission = {
	title : 'Syskonkärlekens vagga',
	missionurl : '//www.youtube.com/embed/XL2y5h-4vVc',
	passphrase : 'alla för en',
	id : 3
};

var victory = {
	title: 'Grattis!',
	done: true
}

var missions = [];
missions.push(firstMission);
missions.push(secondMission);
missions.push(thirdMission);
missions.push(victory);

app.get('/', function(req, res) {
	firstMission.wronganswer = false;
	res.render('mission', firstMission);
});

var validateMissionPassphase = function (req, callback) {
	var mission = null;
	currentMission = missions[req.body.mission-1];
	if (req.body.passphrase === currentMission.passphrase) {
		mission = missions[req.body.mission];
		mission.wronganswer = false;
	} else {
		mission = currentMission;
		mission.wronganswer = true;
	}
	// TODO handle when finished
	callback(mission);
}

app.post('/', function (req, res) {
	validateMissionPassphase(req, function (mission) {
		res.render ('mission', mission);
	});
});

app.get('/victory', function (req, res) {
	res.render('mission', victory);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
	console.log("Listening on port: " + port);
});