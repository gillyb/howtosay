
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var os = require('os');

var url = 'http://hebrew-academy.huji.ac.il/Milim/_layouts/AcademApps/HowToSayInHebrew/GetLetterWords.aspx?l={{LETTER}}&numofcol=2&tabindex=1&_=1405362164582';
var hebrewLetters = 'אבגדהוזחטיכלמנסעפצקרשת';
var fd = fs.openSync('C:\\text.txt', 'w');

var newLine = new Buffer('\r\n');
fs.writeSync(fd, '{\r\n\"Dictionary\":[');

var i = 0;
getDictionaryLetter();

function getDictionaryLetter() {
	var u = url.replace('{{LETTER}}', hebrewLetters[i]);
	request(u, function (error, response, html) {
		if (error) {
			console.log('Error while requesting site...');
			process.exit(1);
		}

		var $ = cheerio.load(html);

		var words = $('#MainTable').find('.divCell');
		words.each(function() {

			fs.writeSync(fd, '{\r\n');

			var EnglishVoweled = $(this).find('span').first().text().replace(/\"/g, '\\\"');
			var EnglishPlain = getPlainHebrew(EnglishVoweled);
			var Hebrew = $(this).find(':nth-child(3)').text().replace(/\"/g, '\\\"');
			
			fs.writeSync(fd, '\t\"Plain\": \"');
			var plainBuffer = new Buffer(EnglishPlain);
			fs.writeSync(fd, plainBuffer, 0, plainBuffer.length);
			fs.writeSync(fd, '\",\r\n');

			fs.writeSync(fd, '\t\"Voweled\": \"');
			var voweledBuffer = new Buffer(EnglishVoweled);
			fs.writeSync(fd, voweledBuffer, 0, voweledBuffer.length);
			fs.writeSync(fd, '\",\r\n');

			fs.writeSync(fd, '\t\"Hebrew\": \"');
			var hebrewBuffer = new Buffer(Hebrew);
			fs.writeSync(fd, hebrewBuffer, 0, hebrewBuffer.length);
			fs.writeSync(fd, '\"\r\n');

			fs.writeSync(fd, '},\r\n');
		});

		i++;
		if (i < hebrewLetters.length)
			getDictionaryLetter();
		else
			fs.writeSync(fd, '\r\n]\r\n}');
	});
}

function getPlainHebrew(str) {
	var plainStr = '';
	for (var i=0; i<str.length; i++) {
		if (hebrewLetters.indexOf(str[i]) >= 0 || str[i] == ' ')
			plainStr += str[i];
		if (str[i] == '(' || str[i] == ')')
			break;
	}
	return plainStr.trim();
}