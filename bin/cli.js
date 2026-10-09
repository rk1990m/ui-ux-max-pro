#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const {
  printWelcome,
  generateComponent,
  initProject,
  listComponents,
  showHelp,
  showVersion,
} = require('../lib/index');

const args = process.argv.slice(2);
const command = args[0];
const options = args.slice(1);

if (!command || command === '--help' || command === '-h') {
  showHelp();
  process.exit(0);
}

if (command === '--version' || command === '-v') {
  showVersion();
  process.exit(0);
}

switch (command) {
  case 'init':
    initProject(options);
    break;

  case 'generate':
  case 'gen':
    if (options.length === 0) {
      console.error('Error: Please specify a component name');
      console.log('Usage: ui-ux-max-pro generate <component-name>');
      process.exit(1);
    }
    generateComponent(options[0], options.slice(1));
    break;

  case 'list':
  case 'ls':
    listComponents();
    break;

  case 'config':
    handleConfig(options);
    break;

  case '--dev':
  case 'dev':
    printWelcome(['--dev']);
    break;

  default:
    printWelcome(args);
}

function handleConfig(opts) {
  const subcommand = opts[0];

  if (!subcommand) {
    console.log('UI/UX Max Pro - Configuration');
    console.log('');
    console.log('Usage:');
    console.log('  ui-ux-max-pro config get <key>');
    console.log('  ui-ux-max-pro config set <key> <value>');
    console.log('  ui-ux-max-pro config show');
    process.exit(0);
  }

  const configFile = path.join(process.cwd(), '.ui-ux-max-pro.json');

  if (subcommand === 'show') {
    if (fs.existsSync(configFile)) {
      const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
      console.log(JSON.stringify(config, null, 2));
    } else {
      console.log('No configuration file found.');
    }
  } else if (subcommand === 'get' && opts[1]) {
    if (fs.existsSync(configFile)) {
      const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
      const value = config[opts[1]];
      console.log(`${opts[1]}: ${value || 'not set'}`);
    } else {
      console.log('No configuration file found.');
    }
  } else if (subcommand === 'set' && opts[1] && opts[2]) {
    let config = {};
    if (fs.existsSync(configFile)) {
      config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
    }
    config[opts[1]] = opts[2];
    fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
    console.log(`✓ Config updated: ${opts[1]} = ${opts[2]}`);
  } else {
    console.log('Invalid config command');
  }
}
