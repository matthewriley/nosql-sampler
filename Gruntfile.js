module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// watcher to build and minify js
		watch: {
			js: {
				files: ['public/js/src/**/*.js', 'node_modules/app/**/*.js'],
				tasks: ['browserify:build', 'uglify']
			}
		},
		// browserify to bundle js
		browserify: {

			test: {
				src: ['./tests/client/specs/**/*.js'],
				dest: './tests/client/test.bundle.js',
				options: {
					debug: true
				}
			},

			build: {
				src: './public/js/src/app.js',
				dest: './public/js/app.js'
			}
		},
		// minify js
		uglify: {
			options: {
				sourceMap: true,
				mangle: {
					except: ['jQuery', 'queryString', 'Mediator']
				}
			},
			my_target: {
				files: {
					'./public/js/app.min.js': ['./public/js/app.js']
				}
			}
		},
		// client tests
		mocha: {
			all: {
				options: {
					run: true,
					reporter: 'Spec'
				},
				src: ['tests/client/testrunner.html']
			}
		},
		// server tests
		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['tests/server/**/*.js']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.registerTask('testClient', ['browserify:test', 'mocha']);
	grunt.registerTask('testServer', ['mochaTest']);
	grunt.registerTask('test', ['testClient', 'testServer']);
	grunt.registerTask('default', ['test']);
};