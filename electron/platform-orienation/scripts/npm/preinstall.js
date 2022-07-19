let err = false;

const nodeVersion = /^(\d+)\.(\d+)\.(\d+)/.exec(process.versions.node);
const majorNodeVersion = parseInt(nodeVersion[1]);
const minorNodeVersion = parseInt(nodeVersion[2]);
const patchNodeVersion = parseInt(nodeVersion[3]);

if (majorNodeVersion < 16 || (majorNodeVersion === 16 && minorNodeVersion < 14)) {
	console.error('\033[1;31m*** Please use node.js versions >=16.14.x and <17.\033[0;0m');
	err = true;
}
if (majorNodeVersion >= 17) {
	console.warn('\033[1;31m*** Warning: Versions of node.js >= 17 have not been tested.\033[0;0m')
}

if (err) {
	console.error('');
	process.exit(1);
}
