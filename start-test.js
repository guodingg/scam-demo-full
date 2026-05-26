#!/usr/bin/env node
process.env.PORT = '3001';
process.env.DB_PATH = '/tmp/antiscam-test.db';
require('./server/index.js');