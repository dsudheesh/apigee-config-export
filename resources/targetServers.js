const fs = require('fs')
const getTargetServers = (client, configFile) => {
    try {
        client.get("/targetservers").then((response) => {
            response.data.forEach((value) => {
                client.get("/targetservers/" + value).then((response) => {
                    var tsFileContent = fs.readFileSync(configFile);
                    var targetservers = JSON.parse(tsFileContent);
                    targetservers.push(response.data);
                    console.log("Retrieved data from ===> " + response.request.res.responseUrl)
                    fs.writeFileSync(configFile, JSON.stringify(targetservers, null, 4), (err) => {
                        if (err) throw err;
                    })
                });
            });
        });
    }
    catch (err) {
        console.log(err.message);
    }
}

exports.getTargetServers = getTargetServers;