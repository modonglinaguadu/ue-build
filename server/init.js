var c = require('child_process'),
	platform = process.platform;
//create the server
require('./bin/createInitServer');

//open the browser
if (platform == 'win32') {
	c.exec('start http://localhost:3050/init.html');
} else if (platform == 'darwin') {
	c.exec('open http://localhost:3050/init.html');
} else if (platform == 'linux') {
	c.exec('x-www-browser http://localhost:3050/init.html');
}