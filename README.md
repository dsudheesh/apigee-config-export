# apigee-config-export
A nodejs tool to export the Apigee Edge environment configurations to individual JSON files.

The exported files can be used for automating config deployments using the Apigee Config Maven Plugin as well as CI/CD tools such as Jenkins.

After executing the command to export the configuration, it will create the following directory strucuture that would contain the config files.
 
```
edge/
    env/
        test/
            caches.json
            kvms.json
        prod/
            targetserver.json
            kvms.json
        env1/
        env2/
        .
        .
        .
        envN
```


## Installation
```
npm install -g apigee-config-export
```

## Usage
```
apigee-config-export --config=<Config Name> --username=<Apigee Edge Login email> --password=<Apigee login password> --host=https://api.enterprise.apigee.com/v1 --organization=<Apigee Organization name> --environment=<Apigee Environment Name>
```

## Allowed values for config
```
all             - exports all the configurations that are listed below at once, from the given environment
caches          - exports caches
kvms            - exports key value maps
keystores       - exports keystores
targetservers   - exports target servers
virtualhost     - exports virtual hosts
references      - exports references
aliases         - exports aliases
```
