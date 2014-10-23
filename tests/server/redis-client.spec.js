var expect = require("chai").expect;
var RedisClient = require("app/redis-client");
var redisClient = new RedisClient();
var guid = require("app/guid");
var key = 'redis-sample:' + guid();
var values = {
	firstName: "Sample",
	lastName: "Name",
	userName: "@sample"
};

describe("Redis client", function(){
	it("getAllKeys returns an array", function(done){
		redisClient.getAllKeys(function(data){
			expect(data).to.be.an('array');
			done();
		});
	});

	it("editRecord returns a string and is OK", function(done){
		redisClient.editRecord(key, values, function(data){
			expect(data).to.be.a('string');
			expect(data).to.equal('OK');
			done();
		});
	});

	it("editRecord creates a record when key is null", function(done){
		redisClient.editRecord(null, values, function(data){
			expect(data).to.equal("OK");
			done();
		});
	});

	it("getRecord returns an object", function(done){
		redisClient.getRecord(key, function(data){
			var d = JSON.parse(data);
			expect(d).to.be.an('object');
			done();
		});
	});

	it("deleteRecord returns a number", function(done){
		redisClient.deleteRecord(key, function(data){
			expect(data).to.be.a('number');
			done();
		});
	});
});