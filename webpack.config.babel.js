import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';


const srcPath = path.join(__dirname, 'src');
const isProd = process.env.NODE_ENV === 'production';
const extractCSS = new ExtractTextPlugin({
    filename: 'css/[name].[hash:6].css',
    allChunks: true
});
export const port = 8888;
export const host = '127.0.0.1';


const plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
        template: path.join(srcPath, 'index.html'),
        filename: isProd ? '../index.html' : 'index.html',
    }),
    new webpack.DefinePlugin({
        IS_PRODUCTION: isProd,
    }),
    new webpack.ProvidePlugin({
        'React': 'react',
    }),
    extractCSS
];

if (isProd) {
    plugins.push(new UglifyJSPlugin());
}

export default {
    context: __dirname,
    entry: {
        app: [
            'babel-polyfill',
            path.join(srcPath, 'index.js'),
        ],
    },
    devtool: isProd ? false : 'source-map',
    output: {
        path: isProd ? path.resolve('./dist/assets/') : path.resolve('./dist/'),
        filename: '[name]-[hash].js',
        publicPath: isProd ? '/assets/' : `http://${host}:${port}/`,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                loader: extractCSS.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]___[hash:base64:5].css'
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                outputStyle: 'expanded'
                            }
                        }
                    ]
                }),
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 25000,
                        }
                    }]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name][hash].[ext]'
                    }
                },
            }
        ]
    },
    plugins,
    resolve: {
        modules: ['node_modules', srcPath],
        extensions: ['.js', '.jsx'],
        // alias: {
        //     'components': path.resolve(srcPath, 'components'),
        // }
    },
    devServer: {
        port,
        hot: true,
        inline: true,
        contentBase: srcPath,
        disableHostCheck: true,
        historyApiFallback: true,
        https: false,
    }
};