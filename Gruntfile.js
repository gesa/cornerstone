module.exports = function (grunt) {
  "use strict";

  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    'cachebreaker': 'grunt-cache-breaker'
  });

  grunt.initConfig({
    site: {
      app: 'app',
      dist: 'dist'
    },

    clean: {
      init: {
        files: [
          {
            dot: true,
            src: '<%= site.dist %>/*'
          }
        ]
      }
    },

    copy: {
      assets: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= site.app %>',
            src: ['img/**/*'],
            dest: '<%= site.dist %>'
          }
        ]
      }
    },

    less: {
      css: {
        options: {
          compress: false,
          sourceMap: true
        },
        files: {
          '<%= site.dist %>/css/core.css': '<%= site.app %>/_less/core.less'
        }
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

    postcss: {
      build: {
        options: {
          map: true,
          processors: [
            require('autoprefixer')({browsers: 'last 2 versions'}),
            require('cssnano')()
          ]
        },
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
        port: 9084,
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
      local: {
        options: {
          base: '<%= site.dist %>'
        }
      }
    },

    concat: {
      options: {
        sourceMap: true,
        separator: grunt.util.linefeed + ';'
      },
      scripts: {
        files: [
          {
            src: [
              '<%= site.app %>/_js/modules/**/*.js',
              '<%= site.app %>/_js/pages/**/*.js',
              '<%= site.app %>/_js/core.js'
            ],
            dest: '<%= site.dist %>/js/core.js'
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
          '<%= site.dist %>/js/core.js': '<%= site.dist %>/js/core.js'
        }
      }
    },

    watch: {
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['dev'],
        options: {
          reload: true
        }
      },
      less: {
        files: ['<%= site.app %>/_less/**/*.less'],
        tasks: ['less:css']
      },
      javascript: {
        files: [
          '<%= site.app %>/_js/**/*.js'
        ],
        tasks: ['concat:scripts']
      },
      assets: {
        files: ['<%= site.app %>/img/**/*'],
        tasks: ['copy']
      },
      jekyll: {
        files: [
          '<%= site.app %>/**/*.{html,md,txt,xml}',
          '<%= site.app %>/_data/**/*.*',
          '<%= site.app %>/_plugins/**/*.rb',
          '_config.*'
        ],
        tasks: ['jekyll:server']
      }
    },

    cachebreaker: {
      deploy: {
        options: {
          match: [
            'core.js',
            'core.css'
          ]
        },
        files: {
          src: [
            '<%= site.dist %>/**/*.html'
          ]
        }
      }
    },

    concurrent: {
      compile: [
        'copy:assets',
        'less:css',
        'concat:scripts'
      ],
      build: [
        'postcss:build',
        'uglify:build',
        'cachebreaker:deploy'
      ]
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

    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      check: {
        src: [
          '<%= site.dist %>/css/core.css'
        ]
      }
    }

  });

  grunt.registerTask('dev', [
    'clean:init',
    'jekyll:server',
    'concurrent:compile',
    'connect:local',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:init',
    'jekyll:build',
    'concurrent:compile',
    'concurrent:build'
  ]);

  grunt.registerTask('test', [
    'jekyll:check',
    'jshint:all',
    'jsbeautifier:verify',
    'csscss:check',
    'csslint:check'
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
