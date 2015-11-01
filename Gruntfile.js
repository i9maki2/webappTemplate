module.exports = function(grunt) {

	grunt.initConfig({
		clean: {
			dist: ['client/dist']
		},
		copy: {
			public: {
				cwd: 'client/src',
				src: 'public/**/*',
				dest: 'client/dist',
				expand: true
			}
		},
		cssmin: {
		  options: {
		    shorthandCompacting: false,
		    roundingPrecision: -1
		  },
		  target: {
		    files: {
		      'client/dist/public/main.css': ['client/src/css/**/*.css']
		    }
		  }
		},

    targethtml: {
      dev: {
        files: {
          'client/dist/index.html': 'client/src/index.html',     // 'destination': 'source'
          'client/dist/404.html': 'client/src/404.html'
        }
      },
      dist: {
        files: {
          'client/dist/index.html': 'client/src/index.html',     // 'destination': 'source'
          'client/dist/404.html': 'client/src/404.html'
        }
      }
    },

		htmlmin: {                                    
		  dist: {                                      // Target
  		  options: {                                 // Target options
  		    removeComments: true,
  		    collapseWhitespace: true
  		  },
  		  files: {                                   // Dictionary of files
  		    'client/dist/index.html': 'client/dist/index.html',     // 'destination': 'source'
  		    'client/dist/404.html': 'client/dist/404.html'
  		  }
		  }
		},

    uglify: {
      build: {
        files: {
          'client/dist/public/main.js': ['client/src/js/**/*.js']
        }
      },
      dev: {
        options: {
          sourceMap: true,
          sourceMapName: 'client/dist/public/main.js.map'
        },
        files: {
          'client/dist/public/main.js': ['client/src/js/**/*.js']
        }
      }
    },

    connect: {
      dev: {
        options: {
          open: 'http://localhost:3000/orders'
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      styles: {
        files: ['client/src/css/**/*.css'],
        tasks: ['cssmin']
      },
      html: {
        files: ['client/src/**/*.html'],
        tasks: ['htmlmin']
      },
      scripts: {
        files: ['client/src/js/**/*.js'],
        tasks: ['uglify:dev']
      }
    }

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-targethtml');

  grunt.registerTask('basic', ['clean', 'copy', 'cssmin']);

	grunt.registerTask('build', ['basic', 'targethtml:dist', 'htmlmin', 'uglify:build']);
	grunt.registerTask('serve', ['basic', 'targethtml:dev', 'htmlmin', 'uglify:dev', 'connect', 'watch']);

	//default when you run $ grunt
	grunt.registerTask('default', ['serve']);

};