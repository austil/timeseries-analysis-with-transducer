// Calcul de la signature

const sign = (timeserie) => {

  const signatureTuples = timeserie.map((val, index, arr) => {
    return index === arr.length - 1 ? [] : [val, arr[index + 1]];
  }).slice(0, timeserie.length - 1);

  const signature = signatureTuples.map(([val1, val2]) => {
    if(val1 === val2) {
      return '=';
    }
    
    return val1 > val2 ? '>' : '<';
  });

  return signature;
}

// Seed Transducer

const transduce = (seedTransducer, signature) => {

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

  return seedTransducerResult;
}

module.exports = {
  sign,
  transduce
};
