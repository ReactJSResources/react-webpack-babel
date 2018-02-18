const path = require('path');
const fs = require('fs');


// Options passed to node-sass
const sassIncludePaths = [
  path.resolve(__dirname, 'src/styles'),
];


// These files will be imported in every sass file
const sassResourcesPaths = [
  path.resolve(__dirname, 'styles/abstracts/_variables.sass'),
  path.resolve(__dirname, 'styles/abstracts/_mixins.sass'),
];

module.exports = [
  // =======================
  // = External SourceMaps =
  // =======================
  // Get source maps from external node packages
  // This is useful when you are developing npm packages and
  // you `npm link`-ed them in your project for test
  {
    test: /\.js?$/,
    include: [
      // path.resolve doesn't work: https://github.com/webpack-contrib/source-map-loader/issues/40
      // fs.realpathSync('./node_modules/my-package'),
      // fs.realpathSync('./node_modules/my-other-package')
    ],
    loader: "source-map-loader",
    enforce: "pre"  // This means this is a Preloader (comes before)
  },

  // =========
  // = Babel =
  // =========
  // Load jsx extensions with babel so we can use
  // 'import' instead of 'require' and es6 syntax
  {
    test: /\.jsx?$/,
    include: path.resolve(__dirname, 'src'),
    loader: ["babel-loader"]
  },

  // =========
  // = Fonts =
  // =========
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    exclude: path.resolve(__dirname, "node_modules"),
    use: ["file-loader"]
  },
  {
    test: /\.(woff|woff2)$/,
    exclude: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "url-loader",
        options: {prefix: "font", limit: 5000}
      }
    ]
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    exclude: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "url-loader",
        options: {
          prefix: "font",
          limit: 10000,
          mimetype: "application/octet-stream"
        }
      }
    ]
  },

  // ==========
  // = Images =
  // ==========
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    exclude: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/svg+xml"
        }
      }
    ]
  },
  {
    test: /\.gif/,
    exclude: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/gif"
        }
      }
    ]
  },
  {
    test: /\.jpg/,
    exclude: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/jpg"
        }
      }
    ]
  },
  {
    test: /\.png/,
    exclude: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 10000,
          mimetype: "image/png",
          name: "[path][name].[ext]"
        }
      }
    ]
  },

  // ==========
  // = Styles =
  // ==========
  // Loaders can be chained by passing multiple loaders, which will be applied from right to left (last to first configured):
  //    - css-loader takes a CSS file and reads off all its dependencies
  //    - style-loader will embed those styles directly into the markup (not when using dev-server)
  // TODO: for prod ==> loader: ExtractTextPlugin.extract('style-loader', 'css-loader')

  // Global CSS (from node_modules)
  // ==============================
  {
    test: /\.css/,
    include: path.resolve(__dirname, "node_modules"),
    use: [
      {
        loader: "style-loader"
      },
      {
        loader: 'css-loader'
      }
    ]
  },

  // Global sass (from app)
  // ===============================
  // Do not modularize these imports
  // (leave them as global css styles)
  {
    test: /\.(sass|scss)$/,
    include: path.resolve(__dirname, 'styles/base'),
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
          camelCase: "dashes",
          importLoaders: 1
        }
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: "inline",
        }
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
          outputStyle: "expanded",
          indentedSyntax: "sass",
          includePaths: sassIncludePaths
        }
      },
      {
        loader: "sass-resources-loader",
        options: {
          resources: sassResourcesPaths
        },
      }
    ]
  },

  // Local SASS css-modules
  // ======================
  {
    test: /\.(sass|scss)$/,
    exclude: path.resolve(__dirname, 'styles/base'),
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
          camelCase: "dashes",
          importLoaders: 1,
          modules: true,
          localIdentName: "[name]__[local]___[hash:base64:5]"
        }
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: "inline",
        }
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
          outputStyle: "expanded",
          indentedSyntax: "sass",
          includePaths: sassIncludePaths
        }
      },
      {
        loader: "sass-resources-loader",
        options: {
          resources: sassResourcesPaths
        },
      }
    ]
  }

];
