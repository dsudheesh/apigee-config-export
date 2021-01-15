const fs = require('fs');

const getVirtualHosts = (client, configFile) => {
    try {
        client.get("/virtualhosts").then((response) => {
            response.data.forEach((value) => {
                client.get("/virtualhosts/" + value).then((response) => {
                    var vhFileContent = fs.readFileSync(configFile);
                    var virtualhosts = JSON.parse(vhFileContent);
                    virtualhosts.push(response.data);
                    console.log("Retrieved data from ===> " + response.request.res.responseUrl)
                    fs.writeFileSync(configFile, JSON.stringify(virtualhosts, null, 4), (err) => {
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
exports.getVirtualHosts = getVirtualHosts;