// // These methods pertain to the process of hovering or holding one or more areas

// This method sets up the initial map events when the layer is loaded
// Using Mapbox map events, a method is called when a layer is hovered over (mousemove/mouseleave) or clicked (mousedown/mouseup)
// Fill and extrusion layers must each have theit own call (for now at least)
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

// Combo methods called when the mouse is moved
const onMouseMove = e => {
  onHoverStart(e);
  removeHoverState(hoveredId);
  hoveredId = setHoverState(e, hoveredId);
}
const onMouseLeave = () => {
  onHoverFinish();
  removeHoverState(hoveredId);
}

const accumulateShortcut = () => {
  let test = $('#accumulate').is(":checked");
  $('#accumulate').prop('checked', !test);
  collectSettings();
  clearAllHolds()
}

// For saving the location of the previous click
let mouseDownCords;
let mouseUpCords;

// These three methods determine where the mouse was clicked (isClick) or dragged
// Mouse drag should pan the map and not count as clicking a tile
const onMouseDown = (e) => mouseDownCords = {x: event.pageX, y: event.pageY};
const onMouseUp = e => {
  mouseUpCords = {x: event.pageX, y: event.pageY};
  if (isClick(mouseUpCords, mouseDownCords)) heldDistricts = holdDistrict(e, heldDistricts);
}
const isClick = (up,down) => (Math.abs(down.x - up.x) < 5 && Math.abs(down.y - up.y) < 5) ? true : false;

// Begins the process for holding a new area clicked by user
// If there are no previously held areas, or the accumulate button is checked, the hold state will be set
// Otherwise, all of the current holds will be removed
const holdDistrict = (e, heldDistricts) => {
  if (Object.keys(heldDistricts).length == 0 || $('#accumulate').is(":checked")){
    heldDistricts = setHoldState(e, heldDistricts);
    onHoldStart(e, heldDistricts)
  } else {
    heldDistricts = clearAllHolds()
  }
  return heldDistricts
}

// Sets the *hover* feature state for a given geoid to TRUE, returns the geoid
const setHoverState = (e,hoveredId) => {
  let geo = SETTINGS['Geo'];
  if (e.features.length > 0) {
    hoveredId = e.features[0].id;
    map.setFeatureState({ source: SOURCE_DICT[geo], id: hoveredId, sourceLayer:SOURCELAYER_DICT[geo]}, { hover: true });
  }
  return hoveredId
}

// Sets the *hover* feature state for a given geoid to FALSE
const removeHoverState = hoveredId => {
  let geo = SETTINGS['Geo'];
  if (hoveredId) map.setFeatureState({ source: SOURCE_DICT[geo], id: hoveredId, sourceLayer:SOURCELAYER_DICT[geo]}, { hover: false });
  hoveredId = null;
}

// Sets the *hold* feature state for a given geoid to TRUE, returns heldDistricts, a list of geoids of held areas
const setHoldState = (e, heldDistricts) => {
  let geo = SETTINGS['Geo'];
  if (e.features.length == 0) return heldDistricts
  heldDistricts = addHeldInfo(e)
  Object.keys(heldDistricts).forEach(h => {
    map.setFeatureState({ source: SOURCE_DICT[geo], id: h, sourceLayer:SOURCELAYER_DICT[geo]}, { hold: true });
  });
  return heldDistricts
}

// Sets the *hold* feature state for a single geoid to FALSE, and removes the area from heldDistricts
// Used when releasing a sinlge hold or an already held area from a group
const removeSingleHoldState = id => {
  let geo = SETTINGS["Geo"];
  delete heldDistricts[id];
  map.setFeatureState({ source: SOURCE_DICT[geo], id: id, sourceLayer:SOURCELAYER_DICT[geo]}, { hold: false });
}

// Sets the *hold* feature state to FALSE for all geoids in heldDistricts, used when clearing the heldDistricts object
const removeAllHoldStates = heldDistricts => {
  let geo = SETTINGS['Geo'];
  Object.keys(heldDistricts).forEach(d => {
      map.setFeatureState({ source: SOURCE_DICT[geo], id: d, sourceLayer:SOURCELAYER_DICT[geo]}, { hold: false });
  });
}

// Clears heldDistricts of all held info
const clearAllHolds = () => {
  removeAllHoldStates(heldDistricts);
  onHoldFinish();
  return heldDistricts = {}
}

// Adds the data of a new held area to heldDistricts
// Will be updated heavily in 2020 version
const addHeldInfo = e => {
  let id = e.features[0].id;
  if (!heldDistricts.hasOwnProperty(id)) {
    heldDistricts[id] = {
      GEOID10: e.features[0].id,
      ALAND10: e.features[0].properties.ALAND10,
      NAME10: e.features[0].properties.NAME10
    }
  } else {
    removeSingleHoldState(id)
  }
  if (Object.keys(heldDistricts).length == 0) clearAllHolds()
  return heldDistricts
}

// Apply changes to map features when a new area is hovered over
// This includes, updating the style guidleines, the move table (which shows the single area value), and the potential flag url
const onHoverStart = e => {
  onHoverStart_style();
  let geoid = e.features[0].id;
  updateMoveTable(e, geoid);
  updateFlagSources(geoid);
}

// When the hover is finished, revert the style changes
const onHoverFinish = () => {
  onHoverFinish_style();
}

// When a new hold is placed on an area, first update the style to reflect
// Then, update the Lens div to show proper data, finally open the Lens div
const onHoldStart = (e, heldDistricts) => {
  if (Object.keys(heldDistricts).length > 0){
    onHoldStart_style();
    updateLens(e);
    openLens();
  }
}

// When a hold is finished, revert the style back to normal, and then hide the Lens div
const onHoldFinish = () => {
  onHoldFinish_style();
  closeLens();
}
