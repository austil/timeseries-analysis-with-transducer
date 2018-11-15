# Timeseries Analysis with Transducer

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
