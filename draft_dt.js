const seedTransducerResult = [
  "out",
  "maybe_before",
  "found",
  "out_after",
  "maybe_before",
  "found",
  "out_after",
  "found",
  "out_after",
  "found",
  "in",
  "out_after",
  "maybe_before",
  "found",
  "out_after",
  "found",
];

// Init
let counter = 0;
let footprint = [];

// Run
let waiting = [];

const retry = () => {
  const nextWaiting = [];

  waiting.forEach(([compute, set]) => {
    if (compute() !== undefined) {
      set(compute());
    } else {
      nextWaiting.push([compute, set]);
    }
  });

  waiting = nextWaiting;
};

seedTransducerResult.forEach((v, i) => {
  console.log(v);

  if(v === "out" || v === "out_reset" || v === "out_after") {
    footprint[i] = 0;
  } 
  else if (v === "maybe_before" || v === "maybe_after") {
    const compute = () => footprint[i + 1];
    const set = value => footprint[i] = value;
    
    if (compute() !== undefined) {
      set(compute());
    } else {
      waiting.push([compute, set]);
    }
  }
  else if (v === "found_end" || v === "found") {
    footprint[i] = counter + 1;
    counter = counter + 1;
  }
  else if (v === "in") {
    footprint[i] = counter;
  }
  else {
    console.log(`Unsuported token : ${v}`);
    process.exit(1);
  }

  retry();
});

// Result
console.log(footprint)
