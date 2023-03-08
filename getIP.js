const config = require('./config.json');
const http = require('http');
var ip = require('ip');

//console.log(ip.address());

module.exports = { getIP: function()  {
const IP = ip.address();


const localtime = new Date().toISOString(); // get current time in ISO format

// Send IP address and local time to remote server
const postData = JSON.stringify({IP, localtime });
const options = {
hostname: config.remote_logging.url,
port: config.remote_logging.port,
path: config.remote_logging.path,
method: 'POST',
headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length,
    },
  };
const req = http.request(options, (res) => {
    console.log(`IP and local time sent to remote server. Response status code: ${res.statusCode}`);
    res.on('data', (chunk) => {
      console.log(`Response message: ${chunk}`);
    });
  });
  req.on('error', (error) => {
    console.error(`Failed to send IP and local time to remote server: ${error}`);
  });
  req.write(postData);
  req.end();
}
};

