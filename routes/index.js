var url = require('url');
var RedisClient = require("app/redis-client");
var redisClient = new RedisClient();
var guid = require("app/guid");

function renderIndex(res, data){
	res.render('index', {
		title: 'Sample Data',
		users: data,
		key: 'redis-sample:' + guid()
	});
}

exports.home = function(req, res){
	redisClient.getAllKeys(function(data){
		var allUsers = [];
		if (data.length){
			data.forEach(function (key, i, array) {
				redisClient.getRecord(key, function(data){
					var d = JSON.parse(data);
					allUsers.push(d);
					if (i === array.length - 1) {
						renderIndex(res, allUsers);
					}
				});
			});
		}
		else{
			renderIndex(res, allUsers);
		}
	});
};

exports.post = function(req, res){
	var key = req.body.key || null;
	var path = url.parse(req.url).pathname;
	redisClient.editRecord(key, req.body, function(data){
		if(path === '/json'){
			res.json(data);
		}
		else{
			res.redirect('/');
		}
	});
};

exports.remove = function(req, res){
	var key = req.query.key;
	var path = url.parse(req.url).pathname;
	redisClient.deleteRecord(key, function(data){
		if(path === '/json:remove'){
			res.json(data);
		}
		else{
			res.redirect('/');
		}
	});
};