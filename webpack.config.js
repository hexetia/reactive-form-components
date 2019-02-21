const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'development',
    externals: [nodeExternals()],
    context: __dirname,
    // devtool: 'cheap-source-map',
    entry: {
        app: [__dirname + '/src/index.ts']
    },
    output: {
        path: __dirname + '/public',
        filename: '[name].bundle.js',
        library: '',
        libraryTarget: 'commonjs'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
        modules: [__dirname + '/src', __dirname + '/node_modules'],
    },
    plugins: [
        new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: "'production'",
                BROWSER: 'true'
            }
        })
    ],
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
