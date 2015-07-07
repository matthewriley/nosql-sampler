var $ = require('jquery');
var queryString = require('query-string');

function xhrAction(formData, mediator, doneAction, xhrParams){
	$.ajax({
		type: xhrParams.type,
		url: xhrParams.url,
		cache: false,
		data: formData,
		dataType: "json"
	})
	.done(function(data, textStatus, jqXHR){
		if(data === 'OK' || (typeof data === 'number' && data > 0)){
			doneAction(formData, mediator);
		}
	})
	.fail(function(){
		console.log('fail');
	});
}

exports.addRecordXHR = function(formData, mediator){
	var doneAction = function(formData, mediator){
		var dataParsed = queryString.parse(formData);
		mediator.publish("addRecordDOM", dataParsed);
		mediator.publish("resetForm", $('#newRecordForm'));
	};
	var xhrParams = {
		type: "POST",
		url: "/json"
	};
	xhrAction(formData, mediator, doneAction, xhrParams);
};

exports.updateRecordXHR = function(formData, mediator){
	var doneAction = function(formData, mediator){
		mediator.publish("updateRecordDOM", formData);
	};
	var xhrParams = {
		type: "POST",
		url: "/json"
	};
	xhrAction(formData, mediator, doneAction, xhrParams);
};

exports.removeRecordXHR = function(formData, mediator){
	var doneAction = function(formData, mediator){
		mediator.publish("removeRecordDOM", formData);
	};
	var xhrParams = {
		type: "GET",
		url: "/json:remove"
	};
	xhrAction(formData, mediator, doneAction, xhrParams);
};
