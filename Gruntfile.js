/*global module:false*/
module.exports = function(grunt) {

  var modRewrite = require('connect-modrewrite');

  var appConfig = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    project: appConfig,

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= project.dist %>/{,*/}*',
            '!<%= project.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              modRewrite(['^[^\\.]*$ /index.html [L]']),
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect().use(
                '/app/assets/styles',
                connect.static('./app/assets/styles')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= project.dist %>'
        }
      }
    },

    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      compass: {
        files: ['<%= project.app %>/assets/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server', 'postcss:server']
      },
      // styles: {
      //   files: [
      //     '<%= project.app %>/assets/styles/**/*.{scss,css}'
      //   ],
      //   tasks: ['clean', 'wiredep'],
      //   options: {
      //     nospawn: true,
      //     livereload: true
      //   }
      // },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= project.app %>/**/*.html',
          '.tmp/assets/styles/{,*/}*.css',
          '.tmp/assets/scripts/{,*/}*.js',
          '<%= project.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    wiredep: {
      app: {
        src: ['<%= project.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['<%= project.app %>/assets/styles/{,*/}*.{scss,sass}'],
        // ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({browsers: ['last 1 version']})
        ]
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/assets/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/assets/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/assets/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/assets/styles/'
        }]
      }
    },

    compass: {
      options: {
        sassDir: '<%= project.app %>/assets/styles',
        cssDir: '.tmp/assets/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= project.app %>/images',
        javascriptsDir: '<%= project.app %>/assets/scripts',
        fontsDir: '<%= project.app %>/assets/styles/fonts',
        importPath: './bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/assets/styles/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= project.dist %>/images/generated'
        }
      },
      server: {
        options: {
          sourcemap: true
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: './images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= project.dist %>/images'
        }]
      }
    },

    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= project.app %>/assets/scripts',
          src: '**/*.js',
          dest: '<%= project.dist %>/assets/scripts'
        }]
      },
      
    },
    
    cssmin: {
      dist: {
        files: {
          '<%= project.dist %>/assets/styles/main.css': [
            '.tmp/assets/styles/{,*/}*.css',
            '<%= project.app %>/assets/styles/{,*/}*.css'
          ]
        }
      }
    },

    concurrent: {
      server: [
        'uglify:dist',
        'compass:server'
      ],
      test: [
        'uglify',
        'compass'
      ],
      dist: [
        'uglify',
        'compass:dist',
        'imagemin'
      ]
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= project.app %>',
          dest: '<%= project.dist %>',
          src: [
            '*.{ico,png,txt}',
            '**/*.html',
            'images/{,*/}*.{webp}',
            'assets/styles/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= project.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          src: [
            'bower_components/font-awesome/fonts/*'
          ],
          dest: '<%= project.dist %>'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= project.app %>/assets/styles',
        dest: '.tmp/assets/styles/',
        src: '{,*/}*.css'
      }
    }
    
  });

  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-compass');
  

  
  grunt.registerTask('default', ['build']);

  grunt.registerTask('serve', function (target) {
    
    grunt.task.run([
      'clean:server', 'wiredep', 'concurrent:server', 'postcss:server', 'connect:livereload', 'watch'
    ]);
  });

  grunt.registerTask('build', function (target) {
    grunt.task.run([
      'clean:dist', 'wiredep', 'concurrent:dist', 'postcss', 'copy:dist', 'cssmin'
    ]);
  });

};
