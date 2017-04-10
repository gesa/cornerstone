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
      init:  '<%= site.dist %>/*'
    },

    copy: {
      images: {
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

    browserify: {
      options: {
        browserifyOptions: {
          debug: true
        },
        debug: true,
      },
      dev: {
        files: {'<%= site.dist %>/js/scripts.js': '<%= site.app %>/_js/core.js'},
        options: {
          transform: [
            ['babelify', {"presets": [["es2015"]]}]
          ]
        }
      },
      build: {
        files: {'<%= site.dist %>/js/scripts.js': '<%= site.app %>/_js/core.js'},
        options: {
          transform: [
            ['babelify', {"presets": [["es2015"]]}],
            ['uglifyify',]
          ]
        }
      }
    },

    exorcise: {
      dev: {
        options: {},
        files: {'<%= site.dist %>/js/scripts.js.map': '<%= site.dist %>/js/scripts.js'}
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
          drafts: true,
          future: true,
          incremental: true,
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
        tasks: [
          'stylelint:lint',
          'less:css'
        ],
        options: {
          interrupt: true,
          spawn: false
        }
      },
      javascript: {
        files: ['<%= site.app %>/_js/**/*.js'],
        options: {
          interrupt: true,
          spawn: false
        },
        tasks: [
          'eslint:lint',
          'browserify:dev',
          'exorcise'
        ]
      },
      images: {
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
          src: ['<%= site.dist %>/**/*.html']
        }
      }
    },

    concurrent: {
      compile: [
        'copy:images',
        'less:css',
      ],
      build: [
        'jekyll:build',
        'browserify:build',
        'postcss:build'
      ]
    },

    eslint: {
      options: {},
      lint: {
        src: '<%= site.app %>/_js/**/*.js'
      }
    },

    stylelint: {
      options: {
        configFile: '.stylelintrc',
        syntax: 'less'
      },
      lint: {
        src: [
          '<%= site.app %>/_less/**/*.{css,less}',
          '!<%= site.app %>/_less/lib/*.*'
        ]
      }
    }
  });

  grunt.registerTask('dev', [
    'clean:init',
    'jekyll:server',
    'browserify:dev',
    'concurrent:compile',
    'connect:local',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:init',
    'concurrent:compile',
    'concurrent:build',
    'exorcise',
    'cachebreaker:deploy'
  ]);

  grunt.registerTask('test', [
    'jekyll:check',
    'stylelint:lint',
    'eslint:lint'
  ]);

  grunt.registerTask('default', [
    'dev'
  ]);

  grunt.event.on('watch', function (action, filePath) {
    grunt.config('eslint.lint.src', filePath);
    grunt.config('stylelint.lint.src', filePath);
  });
};
