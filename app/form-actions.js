var $ = require('jquery');

exports.addButtonAction = function(event, mediator){
	var data = $('#newRecordForm').serialize();
	mediator.publish("addRecordXHR", data);
};

exports.updateButtonAction = function(event, mediator){
	var selectorKey = event.target.dataset.key.replace(':', '');
	var data = $('#form'+selectorKey).serialize();
	mediator.publish("updateRecordXHR", data);
};

exports.removeButtonAction = function(event, mediator){
	var data = {
		key: event.target.dataset.key,
		selectorKey: event.target.dataset.key.replace(':', '')
	};
	mediator.publish("removeRecordXHR", data);
};