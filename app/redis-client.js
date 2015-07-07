var client = require('redis').createClient();
var guid = require('./guid');

client.on('error', function (err) {
	console.error(err);
});

var RedisClient = function (){
	return true;
};

RedisClient.prototype.getAllKeys = function (cb) {
	client.keys('redis-sample:*', function(err, data){
		if (err) return cb(err);
		cb(data);
	});
};

RedisClient.prototype.getRecord = function (key, cb) {
	client.get(key, function(err, data){
		if (err) return cb(err);
		cb(data);
	});
};

RedisClient.prototype.editRecord = function (key, values, cb) {
	key = key || 'redis-sample:' + guid();
	var valueObj = {
		id: key,
		firstName: values.firstName,
		lastName: values.lastName,
		userName: values.userName
	};
	var valueStr = JSON.stringify(valueObj);
	client.set(key, valueStr, function(err, data){
		if (err) return cb(err);
		cb(data);
	});
};

RedisClient.prototype.deleteRecord = function (key, cb) {
	client.del(key, function(err, data){
		if (err) return cb(err);
		cb(data);
	});
};

module.exports = RedisClient;