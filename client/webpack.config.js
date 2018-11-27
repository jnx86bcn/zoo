"use strict";
const webpack = require('webpack');
const path = require('path');
const configHelper = require('./webpack/webpack.helpers.js');
const packageJSON = require('./package.json');
const versionNPM = packageJSON.version;

//Resolve Path
const rootDir = path.resolve(__dirname, '..');

function resolvePath(__path) {
    return path.join(rootDir, __path);
}

const NPM_SCRIPT = process.env && process.env.npm_lifecycle_event || '';
const watchMode = NPM_SCRIPT.indexOf('watch') != -1;
const targetPath = 'dist';

// Webpack plugins
// ****************************************************************************
const WebpackShellPlugin = require('webpack-shell-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const cleanPlugins = [
    new CleanWebpackPlugin(configHelper.cleanPlugin.common.paths, configHelper.cleanPlugin.common.options)   
];

// Webpack configuration (Development)
// ****************************************************************************
module.exports = ({

    resolve: {

        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".web.js", ".ts", ".tsx", ".js", '.css', '.scss'],

        alias: {
            fonts: configHelper.resolvePath('branding/fonts'),
            img: configHelper.resolvePath('branding/img')
        }
    },

    //Enable to source-map
    devtool: "source-map",

    entry: {
        polyfills: configHelper.resolvePath('vendor/polyfills'),
        vendor: configHelper.resolvePath('vendor/vendor'),
        main: configHelper.resolvePath('main')
    },


    output: {
        path: configHelper.resolvePath(targetPath),
        filename: 'scripts/[name]' + '.js',
        sourceMapFilename: 'scripts/[name]' + '.map',
    },

    /*optimization: {
        minimize: true,       
        splitChunks: {
            cacheGroups: {
                default: false,
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',                  
                    chunks: "all",
                    minSize: 1
                },
            },
        },
    },*/

    module: {
        rules: [
            /**
             * Compile all files in ts or tsx
             *
             */

            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },

            /**
             * sass loader support for *.scss files (styles directory only)
             * Loads external sass styles into the DOM, supports HMR
             *
             */

            {
                test: /\.scss$/,
                    use: [
                        {
                            loader: "style-loader" // creates style nodes from JS strings
                        }, 
                        {
                            loader: "css-loader" // translates CSS into CommonJS
                        }, 
                        {
                            loader: "sass-loader",
                            options: {
                                includePaths: ["branding/styles"]
                                }                  
                        }, // compiles Sass to CSS
                    ],
            },


            /**
             * File loader for supporting images, for example, in CSS files.
             */
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: 'file-loader?name=img/[name].[ext]',
                include: [
                        configHelper.resolvePath('branding/img')
                ]
            },


            /**
             * File loader for supporting fonts, for example, in CSS files.
             */
            {
                test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
                use: 'file-loader?name=fonts/[name].[ext]',                 
                include: [
                    configHelper.resolvePath('branding/fonts'),
                    configHelper.resolvePath('node_modules/font-awesome/fonts')
                ],               
            },

        ]
    },

    // Enable watch mode if detected.
    watch: !!watchMode,
    watchOptions: {
        aggregateTimeout: 300,
        poll: false,
        ignored: /node_modules|dist/
    },


    plugins: [

        // Cleans up defined folders and files.
        ...cleanPlugins,


        /**
         * Plugin: CopyWebpackPlugin
         * Description: This is a webpack plugin that copies individual files or entire 
         *              directories to the build directory.
         * 
         * See: https://github.com/kevlened/copy-webpack-plugin
         */
        new CopyWebpackPlugin([
            {
                from: configHelper.resolvePath('branding/fonts'),
                to: configHelper.resolvePath(targetPath + '/fonts')
            },
            {
                from: configHelper.resolvePath('branding/img'),
                to: configHelper.resolvePath(targetPath + '/img')
            },
        ]),

        /**
         * Plugin: WebpackShellPlugin
         * Description: This plugin allows you to run any shell commands before or after 
         *              webpack builds. This will work for both webpack and webpack-dev-server.
         * 
         * See: https://github.com/1337programming/webpack-shell-plugin
         *      https://www.npmjs.com/package/webpack-shell-plugin
         */
        new WebpackShellPlugin({
            onBuildExit: [
                'node webpack/copy-to-folder-project.js'
            ],
        }),

        /**
         * Global parameters
         */      
        new webpack.DefinePlugin({
            'process.env.NODE_ENV' : JSON.stringify('production')
        }),     
    ],   
});