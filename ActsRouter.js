var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');

var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');

var fs = require('fs');
var path = require('path');

//router
var actsRouter = express.Router();

function parseDate(dateVal) {
	let values = dateVal.split('.');
	let parsedDate = {
		day: values[0] || '',
		month: values[1] || '',
		year: values[2] || ''
	};
	return parsedDate;
}

function getMonth(monthNum) {
	let monthWord = {
		'01': 'января',
		'02': 'февраля',
		'03': 'марта',
		'04': 'апреля',
		'05': 'мая',
		'06': 'июня',
		'07': 'июля',
		'08': 'августа',
		'09': 'сентября',
		'10': 'октября',
		'11': 'ноября',
		'12': 'декабря',
		'default' : ''
	}
	
	return (monthWord[monthNum] || monthWord['default']);
}

//support json encoded bodies
actsRouter.use(bodyParser.json());
//support encoded bodies
actsRouter.use(bodyParser.urlencoded({ extended: true }));
//force loading index.hmlt from frontend directory
actsRouter.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname + '/frontend/index.html'));
});
//after GET '/'
//backend.use(express.static('frontend'));

actsRouter.post('/getacts', function(req, res, next) {
	
	let someJSON = req.body.jsonStr;

	let readyObj = JSON.parse(someJSON);
	
	//Load the docx file as a binary	
	var content;
	
	var docType = {
		'1' 		: () => { content = fs.readFileSync(path.resolve(__dirname, 'act_gvs.docx'), 'binary'); },
		'2' 		: () => { content = fs.readFileSync(path.resolve(__dirname, 'act_teplo.docx'), 'binary'); },
		'3' 		: () => { content = fs.readFileSync(path.resolve(__dirname, 'act_obsled.docx'), 'binary'); },
		'4' 		: () => { content = fs.readFileSync(path.resolve(__dirname, 'act_opressovk.docx'), 'binary'); },
		'5' 		: () => { content = fs.readFileSync(path.resolve(__dirname, 'act_promyvk.docx'), 'binary'); },
		'6' 		: () => { content = fs.readFileSync(path.resolve(__dirname, 'act_revisionDU.docx'), 'binary'); },
		'default' 	: () => { content = fs.readFileSync(path.resolve(__dirname, 'act_gvs.docx'), 'binary'); }
	};
	
	(docType[req.body.printtype] || docType['default'])();
	
	var zip = new JSZip(content);

	var doc = new Docxtemplater();
	doc.loadZip(zip);
	
	doc.setData({
		date_d				: parseDate(readyObj.docDate).day, 
		date_m				: getMonth(parseDate(readyObj.docDate).month),
		date_y				: parseDate(readyObj.docDate).year,		
		town				: readyObj.docTown,	
		agentRank			: readyObj.agentRank,
		agent				: readyObj.agentFio,	
		customer			: readyObj.customer,
		customer_address	: readyObj.customerAddress,	
		object				: readyObj.object,
		address				: readyObj.address,
		date				: readyObj.date
	});
	
	try {
		// render the document (replace all occurences of {some_param}, {@some_param}
		doc.render()
	}
	catch (error) {
		
		var e = {
			message: error.message,
			name: error.name,
			stack: error.stack,
			properties: error.properties,
		}
		console.log(JSON.stringify({error: e}));
		// The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
		throw error;
		
		/*
		error.properties.errors.forEach(function(err) {
			console.log(err);
		});
		*/
	}
	
	var buf = doc.getZip().generate({type: 'nodebuffer'});

	res.writeHead(200, {
		'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'Content-disposition': 'attachment;filename="' + 'output' + '.docx"',
		'Content-Length': buf.length
	});
	res.end(new Buffer(buf, 'binary'));
});

module.exports = actsRouter;
