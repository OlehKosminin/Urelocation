// import webpack from "webpack-stream";
// import typescript from "gulp-typescript";

// export const js = () => {
//   const tsProject = typescript.createProject("tsconfig.json");
//   return app.gulp
//     .src(app.path.src.ts)
//     .pipe(
//       app.plugins.plumber(
//         app.plugins.notify.onError({
//           title: "JS",
//           message: "Error: <%= error.message %>",
//         })
//       )
//     )
//     .pipe(tsProject())
//     .pipe(
//       webpack({
//         mode: app.isBuild ? "production" : "development",
//         output: {
//           filename: "app.min.js",
//         },
//       })
//     )
//     .pipe(app.gulp.dest(app.path.build.js))
//     .pipe(app.plugins.browsersync.stream());
// };

import webpack from "webpack-stream";
import typescript from "gulp-typescript";
import tap from "gulp-tap";

export const js = () => {
  const tsProject = typescript.createProject("tsconfig.json");
  return app.gulp
    .src(app.path.src.ts)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "JS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      tap((file) => {
        file.contents = tsProject.src().pipe(tsProject()).js;
      })
    )
    .pipe(
      webpack({
        mode: app.isBuild ? "production" : "development",
        output: {
          filename: "app.min.js",
        },
        module: {
          rules: [
            {
              test: /\.ts$/,
              exclude: /node_modules/,
              use: {
                loader: "ts-loader",
              },
            },
          ],
        },
        resolve: {
          extensions: [".ts", ".js"],
        },
      })
    )
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream());
};
