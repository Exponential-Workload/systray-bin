const fs = require('fs-extra'),
  path = require('path');

let link = `https://systray-portable.astolfo.gay/build-${
  process.platform
}/tray_${process.platform}_release${
  process.platform === 'win32' ? '.exe' : ''
}`;

let directory = process.cwd();
switch (process.platform) {
  case 'linux':
    directory = `${
      process.env.SYSTRAY_PARENT ?? process.env.HOME ?? process.cwd()
    }/.systray-portable`;
    link = link.replace('build-linux', 'build-ubuntu');
    break;
  case 'win32':
    directory = `${
      process.env.SYSTRAY_PARENT ??
      process.env.APPDATA ??
      process.env.LOCALAPPDATA ??
      process.env.USERPROFILE
    }/.systray-portable`;
    link = link.replace('tray_win32', 'tray_windows');
    break;
  case 'darwin':
    directory = `${
      process.env.SYSTRAY_PARENT ?? process.env.HOME ?? ''
    }/.systray-portable`;
    break;
}

const filename = link.split('/').pop();
const filepath = path.join(directory, filename);

/**
 * @param {boolean} force Should we forcefully install
 * @returns {Promise<string>} The path to the executable
 */
export const install = async force => {
  if (!force && fs.existsSync(filepath)) return filepath;
  fs.ensureFileSync(filepath);
  const arrayBuffer = await fetch(link).then(res => res.arrayBuffer());
  const buffer = Buffer.from(arrayBuffer);
  await new Promise((resolve, reject) => {
    fs.writeFile(filepath, buffer, err => {
      if (err) reject(err);
      else resolve(void 0);
    });
  });
  await new Promise((resolve, reject) => {
    fs.chmod(filepath, 0o755, err => {
      if (err) reject(err);
      else resolve(void 0);
    });
  });
  return filepath;
};
export const remove = () => {
  fs.removeSync(filepath);
};

export { link, filename, filepath, directory };
export default {
  link,
  filename,
  filepath,
  directory,
  install,
  remove,
};
