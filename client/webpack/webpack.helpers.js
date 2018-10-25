/**
 * Defines the configuration used by the webpack tasks and plugins.
 * 
 * 
 */
const path = require('path');
const pkg = require('../package.json');

const rootDir = path.resolve(__dirname, '..');
const rootOut = path.resolve(__dirname, '../..');

// Helper methods
// ****************************************************************************
function resolvePath(__path) {

    return path.join(rootDir, __path);

} // resolvePath


// Clean webpack plugin configuration
// ****************************************************************************
const cleanPluginConfig = {

    common: {
        // The path(s) that should be cleaned
        paths: [
            './client/dist',
            './server/zoo/web/files'
        ],

        // The clean options to uses 
        options: {
            root: rootOut,
            verbose: true,
            dry: false,
            watch: false,
            exclude: []
        }
    }
}

// UglifyJS webpack plugin configuration
// ****************************************************************************
const uglifyPluginConfig = {
    options: {
        beautify: false,

        comments: false,

        compress: {
            warnings: false,
            screw_ie8: true,
        },

        mangle: {
            screw_ie8: true,
            keep_fnames: true
        },

        minimize: true,
        sourceMap: true
    }
};


// Simplified exports of the config
module.exports = {
    cleanPlugin: cleanPluginConfig,
    uglifyPlugin: uglifyPluginConfig,
    resolvePath: resolvePath
};