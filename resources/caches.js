const fs = require('fs');
const getCaches = (client, configFile) => {
try{
    client.get("/caches").then((response) => {
    response.data.forEach((value) => {
        client.get("/caches/"+value).then((response) => {
        var cacheFileContent = fs.readFileSync(configFile);
        var caches = JSON.parse(cacheFileContent);
        caches.push(response.data);
        console.log("Retrieved data from ===> " + response.request.res.responseUrl)
        fs.writeFileSync(configFile, JSON.stringify(caches, null, 4), (err) => {
            if (err) throw err;
        })
        });
    });
    });
}
catch (err){
    console.log(err.message)
}
}

exports.getCaches = getCaches;