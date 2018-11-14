const decoratorFilePath = process.argv[2];
const decorationTable = require(decoratorFilePath);

let code = "";
const appendCode = str => {
  code += str + "\n";
};

appendCode(`
const resultFilePath = process.argv[2];
const seedTransducerResult = require(resultFilePath);
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
