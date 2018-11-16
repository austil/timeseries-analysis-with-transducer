const {genTest, runTest} = require("./test_utils");

// PEAK - FEATURE
genTest("peak", "feature");
runTest("peak", "feature", [0,3,5,6,2,0,0], "width max", 4);
runTest("peak", "feature", [0,3,5,6,2,0,0], "max max", 6);
runTest("peak", "feature", [0,3,5,6,2,0,0], "min min", 2);
runTest("peak", "feature", [0,3,5,6,2,0,0], "surface max", 4 * 4);

// PEAK - FOOTPRINT
genTest("peak", "footprint");
runTest("peak", "footprint",
  [0,2,3,2,0,0,3], "",
   [0,1,1,1,0,0]
);

console.log('Tests success !');
