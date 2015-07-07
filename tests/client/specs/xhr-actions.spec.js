var xhrActions = require('../../../app/xhr-actions');

describe("xhr-actions module", function() {

	beforeEach(function(){
		$('<form action="/" method="post" id="newRecordForm"><input type="hidden" name="test" id="test" value="sample"></form>').appendTo('body');
		this.xhr = sinon.useFakeXMLHttpRequest();
		var requests = this.requests = [];
		this.xhr.onCreate = function (xhr) {
			requests.push(xhr);
		};
	});

	afterEach(function(){
		$('#newRecordForm').remove();
		this.xhr.restore();
	});

	it ("addRecordXHR calls mediator.publish() twice after xhr", function(done) {
		var data = $('#newRecordForm').serialize();
		var object = {
			i: 0,
			publish: function(){
				if (this.i == 1){done();}
				else{this.i++;}
			}
		};
		var spy = sinon.spy(object, "publish");
		xhrActions.addRecordXHR(data, object);
		this.requests[0].respond(200, { "Content-Type": "application/json" }, '"OK"');
		expect(spy).to.have.been.callCount(2);
	});

	it ("updateRecordXHR calls mediator.publish() after xhr", function(done) {
		var data = $('#newRecordForm').serialize();
		var object = { publish: function () {done();} };
		var spy = sinon.spy(object, "publish");
		xhrActions.updateRecordXHR(data, object);
		this.requests[0].respond(200, { "Content-Type": "application/json" }, '"OK"');
		expect(spy).to.have.been.callCount(1);
	});

	it ("removeRecordXHR calls mediator.publish() after xhr", function(done) {
		var data = $('#newRecordForm').serialize();
		var object = { publish: function () {done();} };
		var spy = sinon.spy(object, "publish");
		xhrActions.removeRecordXHR(event, object);
		this.requests[0].respond(200, { "Content-Type": "application/json" }, '"OK"');
		expect(spy).to.have.been.callCount(1);
	});

});
