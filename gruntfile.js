"use strict";
module.exports = grunt => {

  grunt.initConfig({

    watch: {
      less: {
        files: ['public/assets/*.less'],
        tasks: ['less', 'cssmin'],
        options: {
          livereload: true
        }
      }
    },

    less: {
      development: {
        options: {
          paths: ['public/assets']
        },
        files: {
          'public/assets/style.css': 'public/assets/style.less'
        }
      }
    },

    cssmin: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'public/assets',
          src: ['*.css', '!*.min.css'],
          dest: 'public/assets',
          ext: '.min.css'
        }]
      }
    },

    browserSync: {
      bsFiles: {
        src: [
          'public/assets/*min.css'
        ]
      },
      options: {
        livereload: true,
        watchTask: true,
        watchEvents: ['add', 'change', 'unlink', 'addDir', 'unlinkDir'],
        server: {
          baseDir: './public'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.task.registerTask('default', ['browserSync', 'watch']);

};
