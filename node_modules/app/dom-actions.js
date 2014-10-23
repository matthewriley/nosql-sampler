var $ = require('jquery');

function compileTemplate(formData){
	var template = '<tr id="row{selectorKey}"><td><form action="/" method="post" id="form{selectorKey}" class="form-inline" role="form">';
	template = template + '<input type="text" class="form-control" id="firstName" name="firstName" placeholder="First name" value="{firstName}" required> ';
	template = template + '<input type="text" class="form-control" id="lastName" name="lastName" placeholder="Last name" value="{lastName}" required> ';
	template = template + '<input type="text" class="form-control" id="userName" name="userName" placeholder="Username" value="{userName}" required> ';
	template = template + '<button type="submit" class="btn btn-default">Update via HTTP</button> <a href="/remove?key={key}" role="button" class="btn btn-default">Delete via HTTP</a> <button type="button" class="btn btn-default" data-key="{key}">Update via XHR</button>&nbsp;<button type="button" class="btn btn-default" data-key="{key}">Delete via XHR</button>';
	template = template + '<input type="hidden" id="key" name="key" value="{key}"></form></td></tr>';

	var selectorKey = formData.key.replace(':', '');
	var compiled = template
		.replace(/{selectorKey}/g, selectorKey)
		.replace(/{key}/g, formData.key)
		.replace('{firstName}', formData.firstName)
		.replace('{lastName}', formData.lastName)
		.replace('{userName}', formData.userName);
	return compiled;
}

exports.addRecordDOM = function(formData, mediator){
	var selectorKey = formData.key.replace(':', '');

	$('#newRecordRow').after(compileTemplate(formData));

	$('#row'+selectorKey+' button:nth-of-type(2)').click(function(event){
		mediator.publish("updateButtonAction", event);
		return false;
	});

	$('#row'+selectorKey+' button:nth-of-type(3)').click(function(event){
		mediator.publish("removeButtonAction", event);
		return false;
	});
};

exports.updateRecordDOM = function(cb){
	cb = cb || function(){};
	$("#domMessage").text("Record updated").show().delay(3000).fadeOut(500, cb);
};

exports.removeRecordDOM = function(formData){
	$('#row'+formData.selectorKey).remove();
};

exports.resetForm = function(newForm){
	newForm[0][0].value = '';
	newForm[0][1].value = '';
	newForm[0][2].value = '';
	window.scrollTo(0, 0);
	return true;
};
