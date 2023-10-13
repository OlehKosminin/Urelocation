import typescript from "gulp-typescript";
import uglify from "gulp-uglify";

export const ts = () => {
  const tsProject = typescript.createProject("tsconfig.json");

  return app.gulp
    .src(app.path.src.ts)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "Ts",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(tsProject())
    .pipe(uglify())
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
};
