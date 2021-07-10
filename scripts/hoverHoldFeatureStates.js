const setupHoverHoldStates = geo => {
  map.on('mousemove', EXTRUDELAYER_DICT[geo], e => onMouseMove(e) );
  map.on('mouseleave', EXTRUDELAYER_DICT[geo], () => onMouseLeave() );
  map.on('mousedown', EXTRUDELAYER_DICT[geo], e => onMouseDown(e) );
  map.on('mouseup', EXTRUDELAYER_DICT[geo], e => onMouseUp(e) );
  map.on('mousemove', LAYER_DICT[geo], e => onMouseMove(e) );
  map.on('mouseleave', LAYER_DICT[geo], () => onMouseLeave() );
  map.on('mousedown', LAYER_DICT[geo], e => onMouseDown(e) );
  map.on('mouseup', LAYER_DICT[geo], e => onMouseUp(e) );
}

let mouseDownCords;
let mouseUpCords;

const onMouseMove = e => {
  onHoverStart(e)
  removeHoverState(hoveredId)
  hoveredId = setHoverState(e, hoveredId)
}

const onMouseLeave = () => {
  onHoverFinish()
  removeHoverState(hoveredId)
}

const onMouseDown = (e) => {
  mouseDownCords = {x: event.pageX, y: event.pageY};
}

const isClick = (up,down) => (Math.abs(down.x - up.x) < 5 && Math.abs(down.y - up.y) < 5) ? true : false;

const onMouseUp = e => {
  mouseUpCords = {x: event.pageX, y: event.pageY};
  if (isClick(mouseUpCords, mouseDownCords)) heldDistricts = holdDistrict(e, heldDistricts);
}

function holdDistrict(e, heldDistricts){
  if (Object.keys(heldDistricts).length == 0 || $('#accumulate').is(":checked")){
    heldDistricts = setHoldState(e, heldDistricts);
    onHoldStart(e, heldDistricts)
  } else {
    heldDistricts = clearAllHolds()
  }
  return heldDistricts
}

const setHoverState = (e,hoveredId) => {
  let geo = SETTINGS['Geo'];
  if (e.features.length > 0) {
    hoveredId = e.features[0].id;
    map.setFeatureState({ source: SOURCE_DICT[geo], id: hoveredId, sourceLayer:SOURCELAYER_DICT[geo]}, { hover: true });
  }
  return hoveredId
}

const removeHoverState = hoveredId => {
  let geo = SETTINGS['Geo'];
  if (hoveredId) map.setFeatureState({ source: SOURCE_DICT[geo], id: hoveredId, sourceLayer:SOURCELAYER_DICT[geo]}, { hover: false });
  hoveredId = null;
}

const setHoldState = (e, heldDistricts) => {
  let geo = SETTINGS['Geo'];
  if (e.features.length == 0) return heldDistricts
  heldDistricts = addHeldInfo(e)
  Object.keys(heldDistricts).forEach(h => {
    map.setFeatureState({ source: SOURCE_DICT[geo], id: h, sourceLayer:SOURCELAYER_DICT[geo]}, { hold: true });
  });
  return heldDistricts
}

const removeSingleHoldState = (id,geo) =>{
  delete heldDistricts[id];
  map.setFeatureState({ source: SOURCE_DICT[geo], id: id, sourceLayer:SOURCELAYER_DICT[geo]}, { hold: false });
}

const removeAllHoldStates = heldDistricts => {
  let geo = SETTINGS['Geo'];
  Object.keys(heldDistricts).forEach(d => {
      map.setFeatureState({ source: SOURCE_DICT[geo], id: d, sourceLayer:SOURCELAYER_DICT[geo]}, { hold: false });
  });
}

const clearAllHolds = () => {
  removeAllHoldStates(heldDistricts);
  onHoldFinish();
  return heldDistricts = {}
}

const addHeldInfo = e => {
  let geo = SETTINGS["Geo"];
  let id = e.features[0].id;
  if (!heldDistricts.hasOwnProperty(id)) {
    heldDistricts[id] = {
      GEOID10: e.features[0].id,
      ALAND10: e.features[0].properties.ALAND10,
      NAME10: e.features[0].properties.NAME10
    }
  } else {
    removeSingleHoldState(id,geo)
  }
  if (Object.keys(heldDistricts).length == 0) clearAllHolds()
  return heldDistricts
}

const onHoverStart = e => {
  onHoverStart_style();
  let geoid = e.features[0].id;
  updateMoveTable(e, geoid);
  updateFlagSources(geoid);
}

const onHoverFinish = () => onHoverFinish_style();

const onHoldStart = (e, heldDistricts) => {
  if (Object.keys(heldDistricts).length > 0){
    updateBar(e)
    openNav0()
}
}

const onHoldFinish = () => closeNav0();
