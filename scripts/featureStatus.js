const setFeatStates = () => {
  let geo = SETTINGS['Geo'];
  let concept = SETTINGS['Concept'];
  let variable = SETTINGS['Variable'];
  data = LORAX[concept]
  .filter(d => d["SIZE"] == geo.toUpperCase() )
  .forEach(d => {
    n = {};
    obj = map.getFeatureState({ source: SOURCE_DICT[geo], sourceLayer: SOURCELAYER_DICT[geo], id: d.GEOID10 });
    if (variable.endsWith("P")){
      v = variable.slice(0,-1);
      n[variable] = d[v] / d[`${v.slice(0,4)}001`];
    } else {
      n[variable] = d[variable];
    }
    map.setFeatureState({ source: SOURCE_DICT[geo], sourceLayer: SOURCELAYER_DICT[geo], id: d.GEOID10 }, n );
  })
}

const setFeatStates2 = variable => {
  let geo = SETTINGS['Geo'];
  let concept = SETTINGS['Concept'];
  // let variable = SETTINGS['Variable'];
  data = LORAX[concept]
  .filter(d => d["SIZE"] == geo.toUpperCase() )
  .forEach(d => {
    n = {};
    obj = map.getFeatureState({ source: SOURCE_DICT[geo], sourceLayer: SOURCELAYER_DICT[geo], id: d.GEOID10 });
    if (variable.endsWith("P")){
      v = variable.slice(0,-1);
      n[variable] = d[v] / d[`${v.slice(0,4)}001`];
    } else {
      n[variable] = d[variable];
    }
    map.setFeatureState({ source: SOURCE_DICT[geo], sourceLayer: SOURCELAYER_DICT[geo], id: d.GEOID10 }, n );
  })
}
