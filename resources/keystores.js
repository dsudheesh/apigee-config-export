const { captureRejectionSymbol } = require('events');
const fs = require('fs');

const getKeystores = (client, configFile) => {
    try {
        client.get("/keystores").then((response) => {
            response.data.forEach((value) => {
                client.get("/keystores/" + value).then((response) => {
                    var keystoreFileContent = fs.readFileSync(configFile);
                    var keystores = JSON.parse(keystoreFileContent);
                    keystores.push({ "name": response.data.name });
                    console.log("Retrieved data from ===> " + response.request.res.responseUrl)
                    fs.writeFileSync(configFile, JSON.stringify(keystores, null, 4), (err) => {
                        if (err) throw err;
                    })
                });
            });
        });
    }
    catch (err) {
        console.log(err.message)
    }
}


exports.getKeystores = getKeystores;