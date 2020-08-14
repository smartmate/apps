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

  const ymlInfo = apps.reduce((list, app) => {
    const newData = {};
    const id = app._data.id;
    if ( id !== undefined ) { newData.name = id; }
    const path = app._path;
    if ( path !== undefined ) { newData.path = path.replace(__dirname + '/', ''); }
    const description = app._data.description;
    if ( description !== undefined ) { newData.description = description; }
    list.push(newData);
    return list;
  }, []);
  const yamlStr = yaml.safeDump(ymlInfo);
  fs.writeFileSync('apps.yml', yamlStr, 'utf8');

};

run();