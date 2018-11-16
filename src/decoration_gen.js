const genDecorationCode = (decorationTable, transducedVarName) => {

  // Code gen helpers

  let code = "";
  const appendCode = str => {
    code += str + "\n";
  };

  // Values and function provided at runtime

  appendCode(`
    const seedTransducerResult = ${transducedVarName};

    // Utils

    const val = { 
      xi: null,
      n: null
    };

    const fn = {
      min: Math.min,
      max: Math.max,
      sum: (x, y) => x + y,
    };
  `);

  // Decoration table params

  if (decorationTable.params) {

    appendCode("// Params");

    const paramsSet = Object.entries(decorationTable.params).map(([name, values], i) => {
      const getParam = `const ${name} = process.argv[${i + 3}];`
      const possibleValues = JSON.stringify(values);
      return `
        ${getParam}

        if (${possibleValues}.includes(${name}) === false) {
          console.log('Unsupported values for param "${name}" : ', ${name});
          console.log('Supported values are : ${possibleValues}')
          process.exit(0);
        }`;
    }).join("\n");

    appendCode(paramsSet);
    appendCode("");
  }

  // Decoration table functions

  if (decorationTable.functions) {

    appendCode("// Functions");

    const functionSet = Object.entries(decorationTable.functions).map(([fnName, fnValues]) => {
      const valuesSwitch = Object.entries(fnValues).map(([value, result]) => {
        return `
          case "${value}":
            return ${result};
        `}).join("");

      return `const ${fnName} = (x) => {
        switch(x) {
          ${valuesSwitch}
          default:
            throw \`Unsupported param for function ${fnName} : \${x}\`;
            process.exit(1);
        }
      };
      `;
    }).join("\n");

    appendCode(functionSet);
    appendCode("");
  }

  // Registers init

  appendCode("// Init");
  Object.entries(decorationTable.variables).map(([k, v]) => {
    appendCode(`let ${k} = ${v};`);
  });

  // "Forward dependencies" handling

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

  // Runtime (token switch)

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

  // Runtime (for loop)

  appendCode(`
    val.n = seedTransducerResult.length + 1;

    seedTransducerResult.forEach(([token, xi], i) => {
      // console.log(\`\${i} - \${xi} - \${token} : r = \${r}, c = \${c}, d = \${d}\`); // FOR DEBUG
      val.xi = xi;
      switch(token) {
        ${decorationCode}
        default:
          throw \`Unsupported token : \${token}\`;
          process.exit(1);
      }

      retry();
    });

    // Result
    console.log(${decorationTable.result});
  `);

  return code;
}

module.exports = {
  genDecorationCode
};
