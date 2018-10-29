const timeserie = require('./ts_sample.json');
const st_decreasing = require('./st_decreasing.json');
const st_peak = require('./st_peak.json');

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

const OUT_TOKEN = {
  FOUND: 'found',
  FOUND_END: 'found_end',
  MAYBE_BEFORE: 'maybe_before',
  OUT_RESET: 'out_reset',
  IN: 'in',
  MAYBE_AFTER: 'maybe_after',
  OUT_AFTER: 'out_after',
  OUT: 'out'
};

const seedTransducer = st_decreasing;
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

for(let i = 0; i < signature.length; i++) {
  console.log(signature[i] + ' ; ' + seedTransducerResult[i]);
}
