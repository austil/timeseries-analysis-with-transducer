const tsGenerator = (n) => {
  const MIN = 0;
  const MAX = 100;
  const MAX_DELTA = 10;
  const ts = [];
  
  let value = MAX_DELTA;
  for(let i = 0; i < n; i++) {
    // direction, 1 for down, 2 for plateau, 3 for up
    const direction = Math.floor(Math.random() * 3) + 1;
    const move = Math.floor(Math.random() * MAX_DELTA) + 1;

    if (direction === 1) {
      value = Math.max(value - move, MIN);
    }
    else if (direction === 3) {
      value = Math.min(value + move, MAX);
    }
    ts.push(value);
  }

  return ts;
};

const test_utils = require('./test_utils');
const bench = require('benchmark');

// Make sure the generated code is available
test_utils.genTest("peak", "footprint");
console.log("Code generated with success");

const tsSizes = [10, 100, 1000, 10000, 100000, 500000, 1000000, 1500000, 2000000];

tsSizes.forEach(tsSize => {
  // Create data file
  test_utils.createTestData("peak", "footprint", tsGenerator(tsSize));
  console.log("Genereated timeserie with sample : " + tsSize);
});
console.log("Generated timeseries ready");

tsSizes.forEach(tsSize => {
  bench('tsGen', {
    'fn': function() { 
      test_utils.testProcess("peak", "footprint", "", tsSize);
     },
    minSamples: 3,
    initCount: 1,
    onComplete : function(){
      console.log('\nRESULTS, tsSize : ' + tsSize + '\n--------------');
      console.log('moyenne arithmétique;' + this.stats.mean.toFixed(4) + ";sec");
      console.log('margin of error;' + this.stats.moe.toFixed(4) + ";sec");
      console.log('relative margin of error;' + this.stats.rme.toFixed(4) + ";%");
      console.log('deviation/ecart type ~;' + this.stats.deviation.toFixed(4) + ";sec");
      console.log('sample size;' + this.stats.sample.length + ";");
      console.log('benchmark duration;' + this.times.elapsed + ";sec");
    },
  }).run();
})

