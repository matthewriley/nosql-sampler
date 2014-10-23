var guid = require("app/guid");
var domActions = require('app/dom-actions');

describe("dom-actions module", function() {

	beforeEach(function(){
		$('<table id="newRecordTable"><tr id="newRecordRow"><td><form action="/" method="post" id="newRecordForm"><input type="hidden" name="test1" id="test1" value="sample"><input type="hidden" name="test2" id="test2" value="sample"><input type="hidden" name="test3" id="test3" value="sample"></form></td></tr></table>').appendTo('body');
		$('<div id="domMessage"></div>').appendTo('body');
	});

	afterEach(function(){
		$('#newRecordTable').remove();
		$('#domMessage').remove();
	});

	it ("addRecordDOM adds new DOM elements", function() {
		var key = 'redis-sample:' + guid();
		var formData = {
			key: key,
			firstName: '',
			lastName: '',
			userName: ''
		};
		domActions.addRecordDOM(formData, {});
		var selectorKey = key.replace(':', '');
		var target = {
			form: $('#row'+selectorKey),
			button1: $('#row'+selectorKey+' button:nth-of-type(2)'),
			button2: $('#row'+selectorKey+' button:nth-of-type(3)')
		};
		expect(target.form.length).to.equal(1);
		expect(target.button1.length).to.equal(1);
		expect(target.button2.length).to.equal(1);
	});

	it ("updateRecordDOM shows then removes update message", function(done) {
		this.timeout(3550);
		domActions.updateRecordDOM(function(){
			var isVisible = $("#domMessage").is(":visible");
			expect(isVisible).to.be.false;
			done();
		});
	});

	it ("removeRecordDOM removes DOM element", function() {
		var selectorKey = 'redis-sample' + guid();
		var formData = {
			selectorKey: selectorKey
		};
		$('<div id="row' + selectorKey + '"></div>').appendTo('body');
		domActions.removeRecordDOM(formData);
		var targetEl = $('#row'+selectorKey);
		expect(targetEl.length).to.equal(0);
	});

	it ("resetForm clears values from newRecordForm", function() {
		var form = $('#newRecordForm');
		domActions.resetForm(form);
		expect(form[0][0].value).to.be.empty;
		expect(form[0][1].value).to.be.empty;
		expect(form[0][2].value).to.be.empty;
	});

});