const fs = require('fs');
const child_process = require('child_process');
const assert = require("assert");

const dir = './test/data';
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

const genTest = (st, dt) => {
  const genCmd = `node ./src/app.js ../seed_transducer/st_${st}.json ../decoration_table/"dt_${dt}".json`
  const genResult = child_process.execSync(genCmd, {cwd: './', encoding: 'utf8'}).trim();
  
  assert.equal(genResult, `Decoracted transducer generated in : ./dist/${dt}_${st}.js`);
}

const runTest = (st, dt, ts, params, expected) => {
  const file = `/ts_test_${dt}_${st}.json`;
  fs.writeFileSync(dir + file, JSON.stringify(ts), 'utf8');

  const cmd = `node ./dist/${dt}_${st}.js ../test/data${file} ${params}`;
  const runResult = child_process.execSync(cmd, {cwd: './', encoding: 'utf8'}).trim();
  
  assert.deepEqual(JSON.parse(runResult), expected);
}

module.exports = {
  genTest,
  runTest
}
