const fs = require('fs');

const getReferences = (client, configFile) => {
    try {
        client.get("/references").then((response) => {
            response.data.forEach((value) => {
                client.get("/references/" + value).then((response) => {
                    var referenceFileContent = fs.readFileSync(configFile);
                    var references = JSON.parse(referenceFileContent);
                    references.push(response.data);
                    console.log("Retrieved data from ===> " + response.request.res.responseUrl)
                    fs.writeFileSync(configFile, JSON.stringify(references, null, 4), (err) => {
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

exports.getReferences = getReferences;