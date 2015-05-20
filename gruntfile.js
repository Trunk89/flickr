module.exports = function (grunt) {
    'use strict';

    var localRootPath = '/',
        localDevPath = './src/',
        localMinPath = './min/',
        localTempPath = './temp/',
        localTestPath = './test/';

    // Auto-load grunt plugin tasks
    require('load-grunt-tasks')(grunt);

    //Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        path: localDevPath,
        minPath: localMinPath,
        testPath: localTestPath,
        rootPath: localRootPath,
        tempPath: localTempPath,
        jshint: {
            options: {
                ignores: ['src/js/libs/*.js', 'src/js/templates/*.js'],
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                forin: true,
                freeze: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noempty: true,
                nonew: true,
                undef: true,
                unused: true,
                strict: true,
                browser: true,
                devel: true,
                plusplus: false,
                globals: {
                    Handlebars: false,
                    Flickr: true
                }
            },
            files: ['src/js/**/*.js']
        },
        clean: {
            all: ['min', 'temp'],
            temp: ['temp']
        },
        concat: {
            app: {
                src: [
                    '<%= path %>js/flickr.js',
                    '<%= path %>js/utils/utils.js',
                    '<%= path %>js/templates/templates.js'
                ],
                dest: '<%= tempPath %>flickr.min.js'
            },
            vendor: {
                src: [
                    '<%= path %>js/libs/handlebars.runtime.js'

                ],
                dest: '<%= tempPath %>vendor.min.js'
            },
            css: {
                src: [
                    '<%= path %>css/normalize.css',
                    '<%= path %>css/base.css',
                    '<%= path %>css/flickr.css',
                    '<%= path %>css/desktop.css'
                ],
                dest: '<%= tempPath %>css/flickr.min.css'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'min/flickr.min.js': ['<%= tempPath %>flickr.min.js'],
                    'min/vendor.min.js': ['<%= tempPath %>vendor.min.js']
                }
            }
        },
        cssmin: {
            options: {
                roundingPrecision: -1
            },
            target: {
                files: {
                    'min/css/flickr.min.css': ['<%= tempPath %>css/flickr.min.css']
                }
            }
        },
        useminPrepare: {
            html: '<%= minPath %>index.html',
            temp: '<%= tempPath %>index.html'
        },
        usemin: {
            html: ['<%= minPath %>index.html'],
            temp: ['<%= tempPath %>index.html']
        },
        copy: {
            all: {
                expand: true,
                cwd: 'src/',
                src: ['index.html'],
                dest: 'min/'
            },
            temp: {
                expand: true,
                cwd: 'src/',
                src: ['index.html'],
                dest: 'temp/'
            }
        },
        rev: {
            files: {
                src: ['<%= minPath %>**/*.{js,css}']
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: 'Handlebars.templates',
                    processName: function(filePath) {
                        return filePath.split(/[\\/]/).pop().split('.')[0];
                    }
                },
                files: {
                    '<%= path %>js/templates/templates.js': '<%= path %>view/*.*'
                }
            }
        },
        jasmine: {
            min: {
                src: 'release/js/*.min.js',
                options: {
                    specs: 'test/unit/**/*Spec.js'
                }
            },
            dev: {
                src: ['src/js/libs/handlebars.runtime.js', 'src/js/flickr.js, src/js/utils/utils.js', 'src/js/templates/templates.js'],
                options: {
                    specs: 'test/unit/**/*Spec.js'
                }
            }

        }
    });

    grunt.registerTask('test', ['jshint', 'jasmine:dev']);
    grunt.registerTask('testmin', ['jshint', 'jasmine:min']);

    grunt.registerTask('build', ['default', 'clean:all', 'concatonate', 'uglify', 'cssmin', 'copy:all', 'useminPrepare:html', 'rev', 'usemin:html', 'clean:temp', 'testmin']);

    grunt.registerTask('concatonate', ['concat:app', 'concat:vendor', 'concat:css']);

    grunt.registerTask('default', [ 'jshint', 'templates', 'test']);

    grunt.registerTask('templates', ['handlebars']);


};
