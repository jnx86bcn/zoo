"use strict";
const webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.config.js'); // the settings that are common to prod and dev


// Webpack plugins
// ****************************************************************************
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


// UglifyJS webpack plugin configuration
// ****************************************************************************
const uglifyPluginConfig = {
    cache: true,
    parallel: true,
    uglifyOptions: {
        compress: true,
        mangle: true,
        minify: true,
        ie8: false,
        safari10: false,       
        ecma: 6
    },
    sourceMap: true,    
};


// Webpack configuration (Development)
// ****************************************************************************
const webpackProConfig = {   

    devtool: "none",

    optimization: {
        minimizer: [
            new UglifyJSPlugin(uglifyPluginConfig)    
        ]
    },

    plugins: [

        /**
         * Plugin: UglifyJSPlugin
         * Description: This plugin allows you to run any shell commands before or after 
         *              webpack builds. This will work for both webpack and webpack-dev-server.
         * 
         * See: https://github.com/webpack-contrib/uglifyjs-webpack-plugin
         */
        //new UglifyJSPlugin(uglifyPluginConfig.options),

        /**
         * Global parameters
         */
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
              }
        }),
    ]
};

module.exports = function (options) {
   
    return webpackMerge(commonConfig, webpackProConfig);

}