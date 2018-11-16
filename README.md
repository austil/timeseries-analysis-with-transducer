# Timeseries Analysis with Transducer

## Goal

```bash
# Generate program
node app.js a_seed_transducer.json a_decoration_table.json
# ./dist/decoration_transducer.js has been created

# Run the program (it may require some params)
node ./dist/decoration_transducer.js a_time_series.json
```

## Current

```bash
# 1. Generate seed transducer results
node src/transducer.js ../seed_transducer/st_peak.json ../ts_sample.json > st_result.json

# 2. Generator decorator program
node src/decoration_gen.js ../decoration_table/dt_footprint.json > runtime.js

# 3. Run generated program on the seed transducer results
node ./runtime.js ./st_result.json

# -----------------------------------
# For parameterized decoration tables
node src/decoration_gen.js ../decoration_table/dt_feature.json > runtime.js
node ./runtime.js ./st_result.json max max
```
