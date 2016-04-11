module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        concat: {
            options: {
                separator: ';',
                process: false,
                stripBanners: {
                    block: true
                }
            },
            app: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/moment/moment.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'public/scripts/**/*.js',
                    'public/scripts/*.js'
                ],
                dest: 'public/dist/app.js'
            },
            style: {
                options: {
                    separator: '\n',
                    process: false,
                    stripBanners: {
                        block: true
                    }
                },
                src: [
                    'public/dist/styles/golden.css',
                    'public/dist/styles/style.css'
                ],
                dest: 'public/dist/style.css'
            }
        },

        uglify: {
            options: {
                sourceMap: true
            },
            built: {
                files: {
                    'public/dist/app.min.js': ['public/dist/app.js']
                }
            }
        },

        less: {
            build: {
                files: {
                    "public/dist/styles/style.css": "bower_components/bootstrap/less/bootstrap.less",
                }
            }
        },

        watch: {
            js: {
                files: ['public/scripts/**/*.js', 'public/scripts/*.js', 'public/dist/styles.golden.css'],
                tasks: ['concat']
            }
        }

    });

    // plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // default task(s).
    grunt.registerTask('default', ['less', 'concat', 'watch']);
    grunt.registerTask('prod', ['less', 'concat', 'uglify']);

};