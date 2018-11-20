# Timeseries Analysis with Transducer

This project was  about understanding and implementing a research article describing how to automatically generate code (in our case JavaScript) for syntezing temporal series.

- Professor : [Nicolas Beldiceanu](https://cv.archives-ouvertes.fr/nicolasbeldiceanu)
- Paper : [Using finite transducers for describing and synthesising structural time-series constraints](https://hal.inria.fr/hal-01370322/document)
- Paper : [Global Constraint Catalog, Volume II, Time-Series Constraints](https://arxiv.org/abs/1609.08925v2)

## Usage

```bash
npm install

# Generate program
node ./src/app.js ../seed_transducer/st_peak.json ../decoration_table/dt_feature.json

# Run the program (it may require some params)
node dist/feature_peak.js ../ts_sample.json width max

# Generate everything and test
npm run test
```

## Developers
 - [Augustin Lacour](https://github.com/austil)
 - [Léo Paris](https://github.com/drakode)
 - [Maxime Maheo](https://github.com/mmaheo)