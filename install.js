const lib = require('.')
const fs = require('fs')
if (!fs.existsSync(lib.filepath) || process.env.FORCE_INSTALL === 'true' || process.env.FORCE_INSTALL === '1') {
  console.log('Downloading Systray Portable...');
  lib.install().then(() => {
    console.log('Systray Portable installed to ' + lib.filepath + '!');
  });
} else {
  console.log('Systray Portable already installed! Pass the env variable FORCE_INSTALL=true to force a reinstall.');
}