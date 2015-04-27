/*
	Fichero para la configuracion de las tareas que gestinan 
	el codigo de la aplicacion.

	Si la ejecucion de GRUNT empieza a ser demasiado lenta, podemos organizar las tareas
	de modo que las dependencias se carguen bajo demanda: 
*/
module.exports = function(grunt) {
	// require('time-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),


		// Validate JS code (client, server, tests)
		jshint: {
			files: ['app.js', 'src/**/*.js', 'spec/src/**/*.js'],
			options: {
				jshintrc: './.jshintrc'
			}
		},

		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
					// captureFile: 'reports/server/test-server.txt',
					// quiet: false, // Optionally suppress output to standard out (defaults to false)
					// clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
				},
				src: ['spec/src/**/*.js']
			},
			coverage: {
				options: {
					reporter: 'lib-cov'
				},
				src: ['tmp/coverage/spec/src/**/*.spec.js']
			}
		},
		mocha_istanbul: {
			coverageSrc: {
				src: ['spec/src/**/*.spec.js'],
				options: {
					coverageFolder: 'reports/server/src',
					reportFormats: ['html'],
					root: './src'
				}
			}
		}

	});

	
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-mocha-istanbul');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('test', ['jshint', 'mochaTest:test']);
	grunt.registerTask('cov', ['mocha_istanbul']);
	
	grunt.registerTask('default', ['test']);

};