
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var os = require('os');

var url = 'http://hebrew-academy.huji.ac.il/Milim/_layouts/AcademApps/HowToSayInHebrew/GetLetterWords.aspx?l=%D7%90&numofcol=2&tabindex=1&_=1405362164582';
var hebrewLetters = 'אבגדהוזחטיכלמנסעפצקרשת';

request(url, function (error, response, html) {
	if (error) {
		console.log('Error while requesting site...');
		process.exit(1);
	}

	var $ = cheerio.load(html);

	var fd = fs.openSync('C:\\text.txt', 'w');

	var words = $('#MainTable').find('.divCell');
	words.each(function() {
		var EnglishVoweled = $(this).find('span').first().text();
		var EnglishPlain = getPlainHebrew(EnglishVoweled);
		var Hebrew = $(this).find(':nth-child(3)').text();
		
		var buffer = new Buffer(Hebrew);
		buffer.write('\r\n');

		fs.writeSync(fd, buffer, 0, buffer.length);
	});

});

function getPlainHebrew(str) {
	var plainStr = '';
	for (var i=0; i<str.length; i++) {
		if (hebrewLetters.indexOf(str[i]) >= 0 || str[i] == ' ')
			plainStr += str[i];
		if (str[i] == '(' || str[i] == ')')
			break;
	}
	return str.trim();
}