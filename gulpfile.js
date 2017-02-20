var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  livereload = require('gulp-livereload'),
  webserver = require('gulp-webserver');

var paths = {
  scrits_dependencies: [
    'bower_components/jquery/dist/jquery.slim.min.js',
    'bower_components/tether/dist/js/tether.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js'
   ],
  styles_dependencies: [
    'bower_components/tether/dist/css/thether.min.css',
    'bower_components/bootstrap/dist/css/bootstrap.min.css'
  ],
  scripts_src: 'src/js/*.js',
  styles_src: 'src/css/*.css',
  scripts_dest: 'dist/js',
  styles_dest: 'dist/css',
  html_src: 'src/*.html',
  html_dest: 'dist'
};

gulp.task('scrits_dependencies', function(){
  gulp.src(paths.scrits_dependencies)
    .pipe(concat('dependencies.js'))
    .pipe(gulp.dest(paths.scripts_dest))
});

gulp.task('styles_dependencies', function() {
  gulp.src(paths.styles_dependencies)
    .pipe(concat('dependencies.css'))
    .pipe(gulp.dest(paths.styles_dest))
});

gulp.task('prebuild', ['scrits_dependencies', 'styles_dependencies']);

gulp.task('scripts', function() {
  gulp.src(paths.scripts_src)
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts_dest))
});

gulp.task('styles', function() {
  gulp.src(paths.styles_src)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(paths.styles_dest))
});

gulp.task('html', function() {
  gulp.src(paths.html_src)
    .pipe(gulp.dest(paths.html_dest))
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts_src, ['scripts']);
  gulp.watch(paths.styles_src, ['styles']);
  gulp.watch(paths.html_src, ['html']);
});
 
gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      open: './dist/index.html'
    }));
});

gulp.task('default', ['prebuild', 'scripts', 'styles', 'html', 'watch', 'webserver']);