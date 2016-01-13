module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    hostname: '0.0.0.0',
                    port: 9021,
                    open: true,
                    livereload: 35736,
                    base: 'build'
                }
            }
        },

        jade: {
            compile: {
                options: {
                    data: {
                        debug: true
                    },
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/jade/',
                    src: '*.jade',
                    dest: 'build',
                    ext: '.html'
                }]
            }
        },

        postcss: {
            options: {
                processors: [
                    require('postcss-import')(),
                    require('cssnext')()
                ]
            },
            files: {
                src: 'src/css/style.css',
                dest: 'build/style.css'
            }
        },

        uncss: {
            dist: {
                options: {
                    ignore: []
                },
                files: {
                    'build/style.css': ['build/*.html']
                }
            }
        },

        premailer: {
            main: {
                options: {
                    verbose: true
                },
                files: {
                    'build/index.html': ['build/index.html']
                }
            }
        },

        watch: {
            options: {
                livereload: 35736
            },
            jade: {
                files: ['src/jade/**/*.jade'],
                tasks: ['jade'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['src/css/style.css', 'src/css/**/*.css'],
                tasks: ['postcss'],
                options: {
                    spawn: false
                }
            },
            img: {
                files: ['src/img/*'],
                tasks: ['copy', 'imagemin'],
                options: {
                    spawn: false
                }
            }
        },

        clean: {
            build: {
                src: ['build']
            }
        },

        copy: {
            main: {
                expand: true,
                cwd: 'src',
                src: ['img/*'],
                dest: 'build/'
            }
        },

        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 5
                },
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: ['img/*.{png,jpg,jpeg,gif}'],
                    dest: 'build/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-premailer');

    // Default task(s).
    grunt.registerTask('default', ['dev', 'connect', 'watch']);

    // Init dev task(s).
    grunt.registerTask('dev', ['clean', 'copy', 'jade', 'postcss']);

    // Prod task(s).
    grunt.registerTask('prod', ['clean', 'copy', 'imagemin', 'jade', 'postcss', 'uncss', 'premailer']);
};