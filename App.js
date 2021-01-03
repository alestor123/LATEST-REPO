#!/usr/bin/env node
require('dotenv').config()

var express = require('express'),
axios = require('axios'),
options  = require('minimist')(process.argv.slice(2)),
app = express(),
api = 'https://api.github.com/graphql',
port = process.env.PORT || options.port || options.p || 3000,
token = process.env.TOKEN || options.token || options.t;
