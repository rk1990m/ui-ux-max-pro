#!/usr/bin/env node

const { printWelcome } = require('../lib/index');

const args = process.argv.slice(2);
printWelcome(args);
