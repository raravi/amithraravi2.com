"use strict";
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
      options: {
        jshintrc: ".jshintrc",
      },
      all: ["Gruntfile.js", "js/*.js", "!js/main.js"],
    },
    watch: {
      js: {
        files: ["<%= jshint.all %>"],
        tasks: ["jshint", "uglify", "surround"],
        options: {
          livereload: true,
        },
      },
    },
    uglify: {
      dist: {
        options: {
          banner:
            "/*! <%= pkg.name %> - v<%= pkg.version %> - " +
            '<%= grunt.template.today("yyyy-mm-dd") %> */',
          compress: {},
          beautify: false,
          mangle: false,
        },
        files: {
          "js/main.js": ["js/plugins/*.js", "js/_*.js"],
        },
      },
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true,
        },
        files: [
          {
            expand: true,
            cwd: "images/",
            src: "{,*/}*.{png,jpg,jpeg}",
            dest: "images/",
          },
        ],
      },
    },
    svgmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: "images/",
            src: "{,*/}*.svg",
            dest: "images/",
          },
        ],
      },
    },
    file_append: {
      default_options: {
        files: [
          {
            prepend: "---\n---\n",
            input: "js/main.js",
          },
        ],
      },
    },
  });

  // Load tasks
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-newer");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-svgmin");
  grunt.loadNpmTasks("grunt-file-append");

  // Register tasks
  grunt.registerTask("mainjs", ["uglify", "file_append"]);
  grunt.registerTask("scripts", ["watch", "uglify"]);
  grunt.registerTask("images", ["newer:imagemin", "newer:svgmin"]);
};
