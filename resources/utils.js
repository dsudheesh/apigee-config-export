const fs = require('fs');
const createConfigFile = (rootdir, filename) => {
    var configFile = rootdir + '/' + filename;
    var configFileExists = fs.existsSync(configFile);
    if (!configFileExists) {
        fs.writeFileSync(configFile, JSON.stringify([]), (err) => {
            if (err) {
                throw err
            }
        });
    }
    return configFile;
}

const createRootDir = (dirname) => {
    var rootdir = './edge/env/' + dirname
    if (!fs.existsSync(rootdir)) {
        fs.mkdirSync(rootdir, { recursive: true })
    }
    return rootdir;
}

exports.createConfigFile = createConfigFile
exports.createRootDir = createRootDir