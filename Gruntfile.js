module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {});

  grunt.initConfig({
    site: {
      app: 'app',
      dist: 'dist'
    },

    clean: {
      server: {
        files: [
          {
            dot: true,
            src: '<%= site.dist %>/*'
          }
        ]
      }
    },

    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml',
        dest: '<%= site.dist %>',
        src: '<%= site.app %>'
      },
      build: {
        options: {
          config: '_config.yml,_config.build.yml'
        }
      },
      server: {
        options: {
          src: '<%= site.app %>'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },

    copy: {
      server: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= site.app %>',
            src: [
              'img/**/*',
              '!**/_*{,/**}',
              'favicon.ico',
              'touch-icon-*.*'
            ],
            dest: '<%= site.dist %>'
          }
        ]
      }
    },

    less: {
      options: {
        compress: true,
        files: {
          '<%= site.dist %>/css/core.css': '<%= site.app %>/_less/core.less'
        }
      },
      build: {},
      server: {
        options: {
          compress: false,
          sourceMap: true
        }
      },
      test: {}
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions'],
        map: true
      },
      build: {
        files: [
          {
            expand: true,
            cwd: '<%= site.dist %>/css',
            src: '**/*.css',
            dest: '<%= site.dist %>/css'
          }
        ]
      }
    },

    connect: {
      options: {
        hostname: '0.0.0.0',
        livereload: 35728,
        port: 9001,
        middleware: function (connect, options, middlewares) {
          middlewares.unshift(function (request, response, next) {
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Methods', '*');
            return next();
          });
          return middlewares;
        },
        useAvailablePort: true
      },
      livereload: {
        options: {
          base: '<%= site.dist %>',
          open: true
        }
      }
    },

    watch: {
      images: {
        files: ['<%= site.app %>/img/**/*.*'],
        tasks: ['copy:server']
      },
      less: {
        files: ['<%= site.app %>/_less/**/*.less'],
        tasks: ['less:server']
      },
      javascript: {
        files: ['<%= site.app %>/_js/**/*.js'],
        tasks: ['concat']
      },
      jekyll: {
        files: [
          '_*.*',
          '<%= site.app %>/**/*.{xml,html,yml,md,mkd,markdown,txt}'
        ],
        tasks: ['jekyll:server', 'concurrent']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= site.dist %>/**/*.*'
        ]
      }
    },

    concat: {
      options: {
        sourceMap: true,
        separator: grunt.util.linefeed + ';'
      },
      server: {
        files: [
          {
            dest: '<%= site.dist %>/js/scripts.js',
            src: [
              'node_modules/jquery/dist/jquery.min.js',
              '<%= site.app %>/_js/core.js'
            ]
          }
        ]
      }
    },

    uglify: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true,
        check: 'gzip'
      },
      build: {
        files: {
          '<%= site.dist %>/js/scripts.js': '<%= site.dist %>/js/scripts.js'
        }
      }
    },

    cssmin: {
      options: {
        sourceMap: true
      },
      build: {
        files: {
          '<%= site.dist %>/css/core.css': '<%= site.dist %>/css/core.css'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= site.app %>/_js/**/*.js'
      ]
    },

    jsbeautifier: {
      options: {
        config: '.jsbeautifyrc'
      },
      modify: {
        src: [
          'Gruntfile.js',
          '<%= site.app %>/_js/**/*.js'
        ]
      },
      verify: {
        src: [
          'Gruntfile.js',
          '<%= site.app %>/_js/**/*.js'
        ],
        options: {
          mode: 'VERIFY_ONLY'
        }
      }
    },

    csscss: {
      options: {
        bundleExec: true,
        ignoreSassMixins: true,
        //ignoreProperties:'',
        //ignoreSelectors: '',
        minMatch: 4,
        verbose: true
      },
      check: {
        src: [
          '<%= site.app %>/_less/core.less'
        ]
      }
    },

    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      check: {
        src: [
          '<%= site.dist %>/css/core.css'
        ]
      }
    },

    concurrent: {
      server: [
        'copy:server',
        'less:server',
        'concat'
      ]
    }
  });

  grunt.registerTask('dev', [
    'clean:server',
    'jekyll:server',
    'concurrent:server',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:server',
    'jekyll:build',
    'concurrent:server',
    'autoprefixer:build',
    'uglify:build',
    'cssmin:build'
  ]);

  grunt.registerTask('test', [
    'jekyll:check',
    'jshint:all',
    'jsbeautifier:verify',
    'csscss:check' //,
    //'less:server',
    //'csslint:check'
  ]);

  grunt.registerTask('precommit', [
    'jekyll:check',
    'jsbeautifier:modify',
    'jshint:all'
  ]);

  grunt.registerTask('default', [
    'dev'
  ]);
};
