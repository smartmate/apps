#!/usr/bin/env node

const fs = require('fs');
const yaml = require('js-yaml');
const tools = require('smartmate-workspace-tools');
const Workspace = tools.Workspace;


async function run() {
  const workspace = new Workspace('./');
  await workspace.load();
  await workspace.validate();
  const apps = workspace.getApps();
  let appsInfo = {};

  appsInfo['apps'] = [];
  for(var i = 0; i < apps.length; i++) {
    appsInfo['apps'][i] = {};
    var id = apps[i]['_data']['id'];
    if ( id !== undefined ) { appsInfo['apps'][i].name = id; }
    var path = apps[i]['_path'];
    if ( path !== undefined ) { appsInfo['apps'][i].path = path.replace(__dirname + '/', ''); }
    var description = apps[i]['_data']['description'];
    if ( description !== undefined ) { appsInfo['apps'][i].description = description; }
  };
  let yamlStr = yaml.safeDump(appsInfo['apps']);
  fs.writeFileSync('apps.yml', yamlStr, 'utf8');
};

run();