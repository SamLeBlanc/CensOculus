//// The method setFeatStates() sets the feature state of each and every tile in the map, major workhorse energy
// Mapbox feature states are used for determining the fill and outline of all tiles
// Method reads the settings, then filters LORAX (the all encompassing data structure) for the proper concept and geography
// Finally, it sets the map feature state AT THAT VARIABLE ONLY to the corresponding value from LORAX
// If a percentage is needed, it will convert

ALMANAC_ALAND = {};

// Note that the feature states are set ONE AT A TIME. This hugely saves on time and space since only the variables
// that will actually be mapped receive feature states. Otherwise, this would take forever to set millions of feature states. (instead it sets only ~300K at a time 🙃)

const setFeatStates = () => {
  if(!LORAX[SETTINGS['Concept']]) return false;
  data = LORAX[SETTINGS['Concept']]
  .filter(d => d["SIZE"] == SETTINGS['Geo'].toUpperCase() )
  .forEach(d => {
    featureObject = {};
    featureObject[SETTINGS['Variable']] = neccesaryConversion(d, SETTINGS['Variable'])
    map.setFeatureState({
      source: SOURCE_DICT[SETTINGS['Geo']],
      sourceLayer: SOURCELAYER_DICT[SETTINGS['Geo']],
      id: d.GEOID10 },
      featureObject );
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

const neccesaryConversion = (d, variable) => {
  if (variable.endsWith("P")) return percentConversion(d, variable)
  else if (variable.endsWith("D")) return densityConversion(d, variable)
  else return d[variable]
}

const createLandAlmanac = () => {
  if (ALMANAC[SETTINGS["Year"]]) {
    ALMANAC[SETTINGS["Year"]]
    .filter( d => d.SIZE == SETTINGS["Geo"])
    .forEach( d => ALMANAC_ALAND[d[`GEOID${SETTINGS["Year"]}`]] = d[`ALAND${SETTINGS["Year"]}`]);
  }
}
