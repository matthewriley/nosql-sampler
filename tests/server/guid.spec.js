"use strict";

var expect = require("chai").expect;
var guid = require("../../app/guid");

describe("Guid", function(){
	it("guid returns a string", function(){
		var id = guid();
		expect(id).to.be.a('string');
	});
	it("guid to have a length of 36", function(){
		var id = guid();
		expect(id.length).to.equal(36);
	});
});
