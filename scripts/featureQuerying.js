const queryRenderedFeatures = () => {
  let features = map.queryRenderedFeatures();
  let tiles = [];
  let tile_ids = [];
  let data = [];
  if (features.length < 20000){
    features.forEach((element) => {
      if(element.source == SOURCE_DICT[SETTINGS["Geo"]] && !tile_ids.includes(element.id)){
        tiles.push(element)
        tile_ids.push(element.id)
      }
    });
    let data = LORAX[SETTINGS['Concept']].filter(d => d["SIZE"] == SETTINGS['Geo'].toUpperCase() ).filter(d => tile_ids.includes(d["GEOID10"]));
    if (data.length > 0) return data
  }
  return LORAX[SETTINGS["Concept"]].filter( d => d.SIZE == SETTINGS["Geo"].toUpperCase());
}

const rePaint = e => {
	getQuartileValues();
	updatePaint();
}
