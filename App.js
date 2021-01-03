#!/usr/bin/env node
require('dotenv').config()

var express = require('express'),
axios = require('axios'),
chalk = require('chalk'),
pck = require('./package.json'),
options  = require('minimist')(process.argv.slice(2)),
app = express(),
api = 'https://api.github.com/graphql',
port = process.env.PORT || options.port || options.p || 3000,
token = process.env.TOKEN || options.token || options.t;

if(options.v || options.version){
    console.log( `${pck.version}`)
  process.exit(1);
}
else if (options.h || options.help) { // checking undifined args
    console.log(`
	Usage: ${pck.name} -p <Port Number> -t <Token> -l 
	-t , --token    for setting tokn
	-p , --port setting port number
	-v , --version for showing cli version
	-i , --issue for reporting web page (any issue or bugs)
`);
process.exit(0)
}
else if (options.i || options.issue) { // checking undifined args
  console.log(`
  Issues at ${pck.bugs.url} 
`);
process.exit(0)
}

else{
	app.listen(port, () => logger(`Server running at ${port}`))
}

// setting axios header auth 
if (token) {// add express limit 
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`;
    logger(`Got Token ${token}`)
}
app.get('/github', (req,res) => {
	res.redirect(pck.homepage)
})



































// logger 
function logger(message){
    console.log(chalk.bgYellow.red(`(LOG):${Date()}:${message}`))
}    
logger.req = (message,req) => {
    console.log(chalk.bgYellow.blue(`(REQUEST):${Date()}:Ip : ${req.ip} : ${message}`))
}
logger.err = (message) => {
    console.error(chalk.bgRed.green(`(ERROR):${Date()} : ${message}`))
}