// This method sets the feature state of each and every tile in the map, major workhorse energy
// It reads the settings, then filters LORAX (the all encompassing data structure) for the proper concept and geography
// Finally, it sets the map feature state AT THAT VARIABLE ONLY to the value from LORAX
// If a percentage is needed, it will convert

// Note that the feature states are set ONE AT A TIME. this hugely saves on time and space since only the variables
// // that will actually be mapped receive feature states. otherwise this would tkae forever to set millions of feature states. (instead only 300K at a time 🙃)

const setFeatStates = () => {
  let geo = SETTINGS['Geo'];
  let concept = SETTINGS['Concept'];
  if (!VVV) variable = SETTINGS['Variable'];
  else { variable = $('#variable-select-1').find(':selected').val(); VVV = false; }
  data = LORAX[concept]
  .filter(d => d["SIZE"] == geo.toUpperCase() )
  .forEach(d => {
    featureObject = {};
    featureObject[variable] = percentConversion(d,variable);
    map.setFeatureState({ source: SOURCE_DICT[geo], sourceLayer: SOURCELAYER_DICT[geo], id: d.GEOID10 }, featureObject );
  })
}

const percentConversion = (d, variable) => {
  if (variable.endsWith("P")){
    let v = variable.slice(0,-1);
    return (d[v] / d[`${v.slice(0,4)}001`]);
  } else {
    return d[variable];
  }
}
