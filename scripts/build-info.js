const {version: version, name: name} = require('../package.json');
const {resolve, relative} = require('path');
const {writeFileSync} = require('fs-extra');
const dateFormat = require('dateformat');

const now = new Date();

const info = {
  name: name,
  version: version,
  buildDate: now,
  buildVersion: `${version}-${dateFormat('yyyymmddhhMMss')}`,
}

const file = resolve(__dirname, '..', 'src', 'environments', 'build-info.ts');
writeFileSync(file,
  `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* tslint:disable */
export interface BuildInfo {
  name: string;
  version: string;
  buildDate: string;
  buildVersion: string;
}
export const BUILD_INFO: BuildInfo = ${JSON.stringify(info, null, 2)};
/* tslint:enable */
`, {encoding: 'utf-8'});

console.log(`Wrote build info ${info.version} to ${relative(resolve(__dirname, '..'), file)}`);
