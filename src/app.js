const fs = require('fs');
const {genDecorationCode} = require("./decoration_gen");

// Add params validation && command line help here ?!

const seedTransducerFilePath = process.argv[2];
const decorationTableFilePath = process.argv[3];

const seedTransducer = require(seedTransducerFilePath);
const decorationTable = require(decorationTableFilePath);

// Do json schema validation here ?!

code = `
// Runtime Dependencies
const {sign, transduce} = require("../src/transducer"); 

// Params
const tsFile = process.argv[2];
const ts = require(tsFile);

// Sign and transduce
const signature = sign(ts);
const seedTransducer = ${JSON.stringify(seedTransducer, null, 2)};
const transduced = transduce(seedTransducer, signature);
const transduced_with_value = transduced.map((v, i) => [v, ts[i]]);

// GENERATED DECORATION CODE
// -----------------------------------------------
${genDecorationCode(decorationTable, "transduced_with_value")}
`;

const dir = './dist';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

const file = `/${decorationTable.name}_${seedTransducer.name}.js`

fs.writeFileSync(dir + file, code, 'utf8');

console.log(`Decoracted transducer generated in : ${dir + file}`);
