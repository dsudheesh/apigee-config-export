const fs = require('fs');
const getAliases = (client, configFile) => {
    try {
        client.get("/keystores").then((response) => {
            response.data.forEach((keystore) => {
                client.get("/keystores/" + keystore + "/aliases").then((response) => {
                    if (response.data.length != 0) {
                        response.data.forEach((alias) => {
                            client.get("/keystores/" + keystore + "/aliases/" + alias).then((response) => {
                                response.data.keystorename = keystore;
                                var aliasFileContent = fs.readFileSync(configFile);
                                var aliases = JSON.parse(aliasFileContent);
                                aliases.push(response.data);
                                console.log("Retrieved data from ===> " + response.request.res.responseUrl)
                                fs.writeFileSync(configFile, JSON.stringify(aliases, null, 4), (err) => {
                                    if (err) throw err;
                                })
                            }).catch(err => { });
                        });
                    }
                });
            });
        });
    }
    catch (err) {
        console.log(err)
    }
}

exports.getAliases = getAliases;