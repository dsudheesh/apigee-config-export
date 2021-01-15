const fs = require('fs');
const getKVMs = (client, configFile) => {
    try {
        client.get("/keyvaluemaps").then((response) => {
            response.data.forEach((value) => {
                client.get("/keyvaluemaps/" + value).then((response) => {
                    var kvmFileContent = fs.readFileSync(configFile);
                    var kvms = JSON.parse(kvmFileContent);
                    kvms.push(response.data);
                    console.log("Retrieved data from ===> " + response.request.res.responseUrl)
                    fs.writeFileSync(configFile, JSON.stringify(kvms, null, 4), (err) => {
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

exports.getKVMs = getKVMs;