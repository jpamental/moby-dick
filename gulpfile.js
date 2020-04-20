const gulp    = require("gulp");
const sass    = require("gulp-sass");
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');

// File paths
const files = { 
  scssPath: 'assets/scss/**/*.scss'
}

// Sass task: compiles the styles.scss file into styles.css
function scssTask(){    
return gulp.src(files.scssPath)
  .pipe(sourcemaps.init()) // initialize sourcemaps first
  .pipe(sassGlob())
  .pipe(sass({
    outputStyle: 'uncompressed'
  }))
  .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
  .pipe(gulp.dest('assets/css')); // put final CSS in assets folder
}

// Watch task: watch SCSS for changes
// If any change, run scss tasks 
function watchTask(){
  gulp.watch([files.scssPath], gulp.series(scssTask));    
}



// Export the default Gulp task so it can be run
// Runs the scss task
// then watch task
exports.default = gulp.series(
    scssTask,
    watchTask
);

exports.build = gulp.series(
  scssTask
)
