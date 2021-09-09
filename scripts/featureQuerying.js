const queryRenderedFeat = () => {
  const features = map.queryRenderedFeatures();
  if (features.length < 20000){
    let feat_ids = getFeatureIDs(features)
    let data = ignoreFilteredIds(feat_ids)
    if (data.length > 0) return data
  }
  return LORAX[SETTINGS["Concept"]].filter( d => d.SIZE == SETTINGS["Geo"].toUpperCase());
}

const rePaint = e => {
  startLoadingIcon(1);
	getQuartileValues();
	updatePaint();
  endLoadingIcon(1);
}

const getFeatureIDs = features => {
  let ids = [];
  features.forEach((element) => {
    if(element.source == SOURCE_DICT[SETTINGS["Geo"]] && !ids.includes(element.id)){
      ids.push(element.id);
    }
  });
  return ids
}

const ignoreFilteredIds = feat_ids => {
  return LORAX[SETTINGS['Concept']]
  .filter(d => d["SIZE"] == SETTINGS['Geo'].toUpperCase() )
  .filter(d => feat_ids.includes(d[`GEOID${SETTINGS["Year"]}`]))
  .filter(d => {
    let filt_ids = readFilteredIds();
    return filt_ids.length > 0 ? filt_ids.includes(d[`GEOID${SETTINGS["Year"]}`]) : true }
  )
}
