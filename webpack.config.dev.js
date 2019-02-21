const webpack = require('webpack');

module.exports = {
    mode: 'development',
    context: __dirname,
    // devtool: 'cheap-source-map',
    entry: {
        // app: [__dirname + "/src/app.tsx"]
        app: ['webpack-hot-middleware/client?reload=true', __dirname + '/src/app.tsx']
    },
    output: {
        path: __dirname + '/public',
        filename: '[name].bundle.js',
        publicPath: 'http://localhost:3000/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
        modules: [__dirname + '/src', __dirname + '/node_modules'],
        alias: {
            history: 'history'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: "'development'",
                BROWSER: 'true'
            }
        })
    ],
    // optimization: {
    //   removeAvailableModules: false,
    //   removeEmptyChunks: false,
    //   splitChunks: false,
    // },
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'react-svg-loader',
                        options: {
                            svgo: {
                                plugins: [{ removeTitle: false }],
                                floatPrecision: 2
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /(\.tsx|\.ts)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: { babelrc: true }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            experimentalWatchApi: true
                        }
                    }
                ],
                include: [__dirname + '/src']
            }
        ]
    }
};
