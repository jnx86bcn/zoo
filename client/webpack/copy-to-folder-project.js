var fs = require('fs-extra');
var colors = require('colors');
var package = require('../package.json');

var source = './dist';
var serverProjectFolder = '../server/zoo/web/files';
var layoutsFolder = 'C:/inetpub/wwwroot/zoo/files';

console.log(colors.cyan('\n\Running copy to folder script...'));

// Continue normally...
const TERM_PROGRAM = process.env.TERM_PROGRAM;
const isApple = TERM_PROGRAM == 'Apple_Terminal';

console.log('\r\n\r\n');
console.log(colors.yellow('zoo v' + package.version));

// Set copy options.
const copyOptions = {
    filter: (src, dest) => {
        return !/\.(html|cs)$/.exec(src) && !/\.hot-update\.(js|json)$/.exec(src);
    }
};

// Copy to server project folder
console.log(colors.cyan('\r\nCopying files to server project...'));
console.log(colors.gray(serverProjectFolder));
fs.copy(source, serverProjectFolder, copyOptions, err => {

    if (err) {
        return console.error(colors.bgRed(err));
    }

    console.log(colors.green('Done!'));    

     // Copy all files to local project folder server <15_DEEP>\TEMPLATE\LAYOUTS\<CUSTOMER>\<PROJECT_NAME> folder.
    // NOTE: Folder must exist.
    console.log(colors.cyan('\r\nCopying files to project folder...'));
    console.log(colors.gray(layoutsFolder));

    if (fs.existsSync(layoutsFolder)) {

        fs.copy(serverProjectFolder, layoutsFolder, copyOptions, err => {

            if (err) {
                return console.error(colors.bgRed(err));
            }

            console.log(colors.green('Done!'));

        });

    } else {
        console.log(colors.bgRed('ENOENT: Folder does not exists.'));
        console.log(colors.gray(layoutsFolder));
        console.log(colors.bgMagenta('Folder skipped'));
        console.log(colors.green('Done!'));
    }

});