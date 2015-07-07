var $ = require('jquery');
var Mediator = require("mediator-js").Mediator;
var mediator = new Mediator();
var formActions = require('../app/form-actions');
var domActions = require('../app/dom-actions');
var xhrActions = require('../app/xhr-actions');

mediator.subscribe("addButtonAction", function(event){
	formActions.addButtonAction(event, mediator);
});
mediator.subscribe("updateButtonAction", function(event){
	formActions.updateButtonAction(event, mediator);
});
mediator.subscribe("removeButtonAction", function(event){
	formActions.removeButtonAction(event, mediator);
});

mediator.subscribe("addRecordXHR", function(formData){
	xhrActions.addRecordXHR(formData, mediator);
});
mediator.subscribe("updateRecordXHR", function(formData){
	xhrActions.updateRecordXHR(formData, mediator);
});
mediator.subscribe("removeRecordXHR", function(formData){
	xhrActions.removeRecordXHR(formData, mediator);
});

mediator.subscribe("addRecordDOM", function(formData){
	domActions.addRecordDOM(formData, mediator);
});
mediator.subscribe("updateRecordDOM", function(formData){
	domActions.updateRecordDOM(formData, mediator);
});
mediator.subscribe("removeRecordDOM", function(formData){
	domActions.removeRecordDOM(formData, mediator);
});
mediator.subscribe("resetForm", function(formData){
	domActions.resetForm(formData);
});

$(document).ready(function(){
	$('#submitXHR').click(function(event){
		mediator.publish("addButtonAction", event);
		return true;
	});
	$('.systemRecords button:nth-of-type(2)').click(function(event){
		mediator.publish("updateButtonAction", event);
		return false;
	});
	$('.systemRecords button:nth-of-type(3)').click(function(event){
		mediator.publish("removeButtonAction", event);
		return false;
	});
});
