/*
 * This is a temporary fix to an issue coming from react-spring
 * which is used at nivo library charts
 * Has to be run prior to building or nivo chart animations/axis break on production
 */

const fs = require('fs');
const path = require('path');

const packagesToPatch = ['animated', 'core', 'konva', 'native', 'shared', 'three', 'web', 'zdog'];

packagesToPatch.forEach(patchPackage);

function patchPackage(pkg) {
  const packageJsonPath = path.join('node_modules', '@react-spring', pkg, 'package.json');
  const packageJson = fs.readFileSync(packageJsonPath, 'utf-8');
  const modifiedPackageJson = packageJson.replace('"sideEffects": false,', '');
  fs.writeFileSync(packageJsonPath, modifiedPackageJson, {
    encoding: 'utf-8',
  });
}
