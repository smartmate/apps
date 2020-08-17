#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const tools = require('smartmate-workspace-tools');
const Workspace = tools.Workspace;

async function run() {
  const parentDirectory = path.dirname(__dirname) + path.sep;
  const workspace = new Workspace(`${parentDirectory}`);
  await workspace.load();
  await workspace.validate();
  const apps = workspace.getApps();
  const appsInfo = apps.map((app) => {
    const name = app.toJSON().id;
    const appPath = app.getPath().replace(`${parentDirectory}`, '');
    const appDescription = app.toJSON().description;
    const description = typeof appDescription === "undefined" || !appDescription ? "" : appDescription;
    return { name, 'path': appPath, description };
  });
  const yamlStr = yaml.safeDump(appsInfo);
  fs.writeFileSync(`${parentDirectory}apps.yml`, yamlStr, 'utf8');
};

run();