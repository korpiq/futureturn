module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      compile_rules_yaml: {
        files: ['source/rules/**/*.yaml'],
        tasks: ['yaml'],
      },
      reload_watch: {
        files: 'Gruntfile.js',
        options: {
          reload: true,
        },
      },
    },
    yaml: {
      compile_rules: {
        options: {
          strict: true,
        },
        files: [
          {
            expand: true,
            cwd: 'source/rules/',
            src: '**/*.yaml',
            dest: 'source/simulator/rules/',
          },
        ],
      },
    },
  })

  grunt.loadNpmTasks('grunt-yaml')
  grunt.loadNpmTasks('grunt-contrib-watch')
}
