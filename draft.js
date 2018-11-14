const timeserie = require('./ts_sample.json');

// Calcul de la signature

const signatureTuples = timeserie.map((val, index, arr) => {
  return index === arr.length - 1 ? [] : [val, arr[index + 1]];
}).slice(0, timeserie.length - 1);

const signature = signatureTuples.map(([val1, val2]) => {
  if(val1 === val2) {
    return '=';
  }
  
  return val1 > val2 ? '>' : '<';
});

// Seed Transducer

const st_decreasing = require('./seed_transducer/st_decreasing.json');
const st_peak = require('./seed_transducer/st_peak.json');

const seedTransducer = st_peak; // Choose automate here
let currentState = seedTransducer.starting_state;
const seedTransducerResult = [];

const getTransition = (state, c) => seedTransducer.links.filter(([from, , input]) => {
  const validStart = from === state;
  const acceptInput = input.includes(c);
  return validStart && acceptInput
})[0];

const run = c => {
  const [from, to, input, output] = getTransition(currentState, c);
  currentState = to;
  seedTransducerResult.push(output);
}

signature.forEach(run);


// for(let i = 0; i < signature.length; i++) {
//   console.log(seedTransducerResult[i]);
// }

// Decoration table

const decorationTable = require('./decoration_table/dt_footprint.json');

let code = "";
const appendCode = str => {
  code += str + "\n";
};

appendCode(`
const seedTransducerResult = require('./st_result.json');
`);

appendCode("// Init");
Object.entries(decorationTable.variables).map(([k, v]) => {
  appendCode(`let ${k} = ${v};`);
});

appendCode(`
// Run
let waitingDecorations = [];

const retry = () => {
  const failedDecorations = [];

  waitingDecorations.forEach(([compute, set]) => {
    if (compute() !== undefined) {
      set(compute());
    } else {
      failedDecorations.push([compute, set]);
    }
  });

  waitingDecorations = failedDecorations;
};
`);

const instructionCode = (instruction, index) => {
  const [setStr, computeStr] = instruction.split("=").map(s => s.trim());
  return `
      const compute${index} = () => ${computeStr};
      const set${index} = value => ${setStr} = value;

      if (compute${index}() !== undefined) {
        set${index}(compute${index}());
      } else {
        waitingDecorations.push([compute${index}, set${index}]);
      }
  `;
};

const decorationCode = Object.entries(decorationTable.decoration)
  .map(([token, instructions]) => `
    case '${token}': {
      ${instructions.map(instructionCode).join('\n')}
      break;
    }
  `).join('\n');

appendCode(`
seedTransducerResult.forEach((token, i) => {
  switch(token) {
    ${decorationCode}
    default:
      console.log(\`Unsuported token : \${token}\`);
      process.exit(1);
  }

  retry();
});

// Result
console.log(${decorationTable.result});

`);

console.log(code);
