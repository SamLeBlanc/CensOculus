//// The method setFeatStates() sets the feature state of each and every tile in the map, major workhorse energy
// Mapbox feature states are used for determining the fill and outline of all tiles
// Method reads the settings, then filters LORAX (the all encompassing data structure) for the proper concept and geography
// Finally, it sets the map feature state AT THAT VARIABLE ONLY to the corresponding value from LORAX
// If a percentage is needed, it will convert

ALMANAC_ALAND = {};
let VVV = false;

// Note that the feature states are set ONE AT A TIME. This hugely saves on time and space since only the variables
// that will actually be mapped receive feature states. Otherwise, this would take forever to set millions of feature states. (instead it sets only ~300K at a time 🙃)

const setFeatStates = () => {
  let geo = SETTINGS['Geo'];
  let concept = SETTINGS['Concept'];
  let year = SETTINGS["Year"];

  if(!LORAX[concept]) return false;

  if (!VVV) variable = SETTINGS['Variable']; // VVV is the variable for View By from filter (will change later)
  else { variable = $('#variable-select-1').find(':selected').val(); VVV = false; }

  // if the Density is required, filter the Almanac for neccesary data
  ALMANAC_ALAND = {};

  if (variable) {
    if(variable.endsWith("D")) ALMANAC[year].filter( d => d.SIZE == geo).forEach( d => ALMANAC_ALAND[d.GEOID10] = d.ALAND10);
  }

  data = LORAX[concept]
  .filter(d => d["SIZE"] == geo.toUpperCase() )
  .forEach(d => {
    featureObject = {};

    if (variable.endsWith("P")) featureObject[variable] = percentConversion(d,variable);
    else if (variable.endsWith("D")) featureObject[variable] = densityConversion(d,variable);
    else featureObject[variable] = d[variable];

    map.setFeatureState({ source: SOURCE_DICT[geo], sourceLayer: SOURCELAYER_DICT[geo], id: d.GEOID10 }, featureObject );
  })
}

// convert value to percentage based on total population in that area
const percentConversion = (d, variable) => {
    let v = variable.slice(0,7);
    return (d[v] / d[`${v.slice(0,4)}001`]);
}

// convert value to desnity based on land area from almanac
const densityConversion = (d, variable) => {
    let year = SETTINGS["Year"];
    let v = variable.slice(0,7);
    let a = metersSq2MilesSq(ALMANAC_ALAND[d[`GEOID${year}`]]);
    if (a) return (d[v] / a);
    else return 0;
}

const neccesaryConversion = d => {
  let variable = SETTINGS["Variable"];
  if (variable.endsWith("P")) percentConversion(d, variable)
  else if (variable.endsWith("D")) densityConversion(d, variable)
  else return d[variable]

}
