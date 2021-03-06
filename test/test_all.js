const {genTest, runTest} = require("./test_utils");

// PEAK - FEATURE
genTest("peak", "feature_after_1");
runTest("peak", "feature_after_1",
  [7,5,5,1,4,5,2,2,3,5,6,2,3,3,3,1], "max",
   [0,0,0,0,0,5,0,0,0,0,6,0,0,0,3,0]
);

// PEAK - FEATURE AGGR
genTest("peak", "feature_aggr_after_1");
runTest("peak", "feature_aggr_after_1", [0,3,5,6,2,0,0], "width max", 4);
runTest("peak", "feature_aggr_after_1", [7,5,5,1,4,5,2,2,3,5,6,2,3,3,3,1], "width max", 3);
runTest("peak", "feature_aggr_after_1", [0,3,5,6,2,0,0], "max max", 6);
runTest("peak", "feature_aggr_after_1", [0,3,5,6,2,0,0], "min min", 2);
runTest("peak", "feature_aggr_after_1", [0,3,5,6,2,0,0], "surface max", 16);

// PEAK - FOOTPRINT
genTest("peak", "footprint");
runTest("peak", "footprint",
  [0,2,3,2,0,0,3], "",
   [0,1,1,1,0,0,0]
);

// SUMMIT - FEATURE AGGR
genTest("summit", "feature_aggr_after_1");
runTest("summit", "feature_aggr_after_1", [0,1,1,2,1,1,0], "width max", 5);
runTest("summit", "feature_aggr_after_1", [0,1,1,2,1,1,0], "max max", 2);
runTest("summit", "feature_aggr_after_1", [0,1,1,2,1,1,0], "min min", 1);
runTest("summit", "feature_aggr_after_1", [0,1,1,2,1,1,0], "surface max", 6);
runTest("summit", "feature_aggr_after_1", [7,1,5,4,4,3,3,4,6,6,2,3,4,2,3,1], "surface max", 13);

// SUMMIT - FOOTPRINT
genTest("summit", "footprint");
runTest("summit", "footprint",
  [0,2,3,2,0,2,3,2,0], "",
   [0,1,1,1,0,2,2,2,0]
);

// PROPER PLATEAU - FEATURE AGGR
genTest("proper_plateau", "feature_aggr_after_1");
runTest("proper_plateau", "feature_aggr_after_1", [0,1,1,1,0,0,0], "width max", 3);
runTest("proper_plateau", "feature_aggr_after_1", [0,1,1,1,0,0,0], "max max", 1);
runTest("proper_plateau", "feature_aggr_after_1", [0,1,1,1,0,0,0], "min min", 1);
runTest("proper_plateau", "feature_aggr_after_1", [0,1,1,1,0,0,0], "surface max", 3);

// PROPER PLATEAU - FOOTPRINT
genTest("proper_plateau", "footprint");
runTest("proper_plateau", "footprint",
  [0,1,1,1,0,2,2,2,0], "",
   [0,1,1,1,0,2,2,2,0]
);

// INFLEXION - FEATURE AGGR
genTest("inflexion", "feature_aggr_after_1");
runTest("inflexion", "feature_aggr_after_1", [1,2,6,6,4,4,3,5,2,5,1,5,3,3,4,4], "width max", 3);
runTest("inflexion", "feature_aggr_after_1", [0,1,2,3,2,0,0], "width max", 3);
runTest("inflexion", "feature_aggr_after_1", [0,1,2,3,2,0,0], "max max", 3);
runTest("inflexion", "feature_aggr_after_1", [0,1,2,3,2,0,0], "min min", 1);
runTest("inflexion", "feature_aggr_after_1", [1,2,6,6,4,4,3,5,2,5,1,5,3,3,4,4], "surface max", 14);
runTest("inflexion", "feature_aggr_after_1", [0,1,2,3,2,0,0], "surface max", 6);

// INFLEXION - FOOTPRINT
genTest("inflexion", "footprint");
runTest("inflexion", "footprint",
  [0,1,2,3,2,0], "",
   [0,1,1,1,0,0]
);

// DESCREASING - FEATURE AGGR
genTest("decreasing", "feature_aggr_after_0");
runTest("decreasing", "feature_aggr_after_0", [3,4,4,3,2,2,1], "width max", 2);
runTest("decreasing", "feature_aggr_after_0", [3,4,2,2,5,6,6,4,4,3,1,1,4,6,4,4], "surface max", 10);
runTest("decreasing", "feature_aggr_after_0", [3,4,2,2,5,6,6,4,4,3,1,1,4,6,4,4], "min min", 1);

// DESCREASING - FOOTPRINT
genTest("decreasing", "footprint");
runTest("decreasing", "footprint",
  [1,3,2,1,1], "",
   [0,1,2,0,0]
);

console.log('Tests success !');
