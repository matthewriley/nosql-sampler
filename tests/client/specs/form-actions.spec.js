var guid = require("../../../app/guid");
var formActions = require('../../../app/form-actions');

describe("form-actions module", function() {

	it ("addButtonAction calls mediator.publish()", function() {
		$('<form action="/" method="post" id="newRecordForm"><input type="hidden" name="test" id="test" value="sample"></form>').appendTo('body');
		var object = { publish: function () {} };
		var spy = sinon.spy(object, "publish");
		formActions.addButtonAction({}, object);
		expect(spy).to.have.been.callCount(1);
	});

	it ("updateButtonAction calls mediator.publish()", function() {
		var key = 'redis-sample:' + guid();
		var selectorKey = key.replace(':', '');
		var event = {target:{dataset:{key: key}}};
		$('<form action="/" method="post" id="form' + selectorKey + '"></form>').appendTo('body');
		var object = { publish: function () {} };
		var spy = sinon.spy(object, "publish");
		formActions.updateButtonAction(event, object);
		expect(spy).to.have.been.callCount(1);
	});

	it ("removeButtonAction calls mediator.publish()", function() {
		var key = 'redis-sample:' + guid();
		var event = {target:{dataset:{key: key}}};
		var object = { publish: function () {} };
		var spy = sinon.spy(object, "publish");
		formActions.removeButtonAction(event, object);
		expect(spy).to.have.been.callCount(1);
	});

});
