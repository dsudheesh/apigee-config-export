#!/usr/bin/env node
const axios = require("axios").default;
const fs = require('fs')
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const utils = require('./resources/utils.js');
const caches = require('./resources/caches.js');
const kvms = require('./resources/kvms.js');
const aliases = require('./resources/aliases.js');
const keystores = require('./resources/keystores.js');
const targetServers = require('./resources/targetServers.js');
const virtualHosts = require('./resources/virtualHosts.js');
const references = require('./resources/references.js');

const optionsDefinition = [
  {
    name: "config", alias: "c", type: String
  },
  {
    name: "username", alias: "u", type: String
  },
  {
    name: "password", alias: "p", type: String
  },
  {
    name: "host", alias: "h", type: String
  },
  {
    name: "organization", alias: "o", type: String
  },
  {
    name: "environment", alias: "e", type: String
  },
  {
    name: "help", type: Boolean
  }
];

const options = commandLineArgs(optionsDefinition, { stopAtFirstUnknown: true });


const sections = [
  {
    header: 'Apigee configruation export',
    content: 'Application to export apigee environment configurations such as targetServers, Caches etc'
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'config',
        description: 'The name of the environment resources to export. Allowed values are, all caches, kvms, keystores, targetservers, virtualhost, references, aliases, '
      },
      {
        name: 'username',
        description: 'Apigee Edge username with appropriate permissions.'
      },
      {
        name: 'password',
        description: 'Password for the username.'
      },
      {
        name: 'host',
        description: 'Apigee Management API Endpoint. Example https://api.enterprise.apigee.com/v1'
      },
      {
        name: 'organization',
        description: 'The name of the Apigee Edge Organization'
      },
      {
        name: 'environment',
        description: 'The name of the Apigee Edge Enviroment'
      }
    ]
  }
]

const usage = commandLineUsage(sections)

var valid = options.help || (
  options.config && options.username && options.password && options.host && options.organization && options.environment
)

if (!valid || options.help) {
  console.log(usage)
}


var config = options.config
var username = options.username
var password = options.password
var host = options.host
var organization = options.organization
var environment = options.environment
var baseURL = host + '/organizations/' + organization + '/environments/' + environment

const client = axios.create({
  baseURL: baseURL,
  headers: {
    'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
  }
});


//Create the directory to store the environment config files
var rootdir = utils.createRootDir(environment);

switch (config) {
  case "all":
    getAllConfigs();
    break;
  case "caches":
    caches.getCaches(client, utils.createConfigFile(rootdir, "caches.json"));
    break;
  case "kvms":
    kvms.getKVMs(client, utils.createConfigFile(rootdir, 'kvms.json'));
    break;
  case "keystores":
    keystores.getKeystores(client, utils.createConfigFile(rootdir, 'keystores.json'));
    break;
  case "targetservers":
    targetServers.getTargetServers(client, utils.createConfigFile(rootdir, 'targetServers.json'));
    break;
  case "virtualhosts":
    virtualHosts.getVirtualHosts(client, utils.createConfigFile(rootdir, 'virtualHosts.json'));
    break;
  case "references":
    references.getReferences(client, utils.createConfigFile(rootdir, 'references.json'));
    break;
  case "aliases":
    aliases.getAliases(client, utils.createConfigFile(rootdir, 'aliases.json'));
    break;
}

function getAllConfigs() {
  caches.getCaches(client, utils.createConfigFile(rootdir, "caches.json"));
  kvms.getKVMs(client, utils.createConfigFile(rootdir, 'kvms.json'));
  keystores.getKeystores(client, utils.createConfigFile(rootdir, 'keystores.json'));
  targetServers.getTargetServers(client, utils.createConfigFile(rootdir, 'targetServers.json'));
  virtualHosts.getVirtualHosts(client, utils.createConfigFile(rootdir, 'virtualHosts.json'));
  references.getReferences(client, utils.createConfigFile(rootdir, 'references.json'));
  aliases.getAliases(client, utils.createConfigFile(rootdir, 'aliases.json'));
}