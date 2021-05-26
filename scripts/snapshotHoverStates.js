function getHoverHoldStates(variable,geo){
  map.on('mousemove', LAYER_DICT[geo], function (e) {
    onHoverStart(e,variable,geo)
    hoveredId = setHoverState(e,geo,hoveredId)
    if (!heldDistrict){
      //eFeats = e.features;
      //console.log(eFeats)
    };
  });
  map.on('mouseleave', LAYER_DICT[geo], function () {
    onHoverFinish()
    removeHoverState(geo,hoveredId)
  });
  map.on('mousedown', LAYER_DICT[geo], function (e) {
    down = JSON.stringify(e.point)
  });
  map.on('mouseup', LAYER_DICT[geo], function (e) {
    up = JSON.stringify(e.point)
    if(down == up){
      heldId = holdDistrict(e,geo,heldId)
    }
  });
}
function holdDistrict(e,geo,heldId){
  if (heldId){
    heldDistrict = false;
    removeHoldState(geo,heldId);
    heldId = null;
  } else {
    heldDistrict = true;
    heldId = setHoldState(e,heldId);
  }
  return heldId
}

function setHoverState(e,geo,hoveredId){
  if (e.features.length > 0) {
    if (hoveredId) {
      map.setFeatureState({ source: SOURCE_DICT[geo], id: hoveredId, sourceLayer:SOURCELAYER_DICT[geo]}, { hover: false });
    }
    hoveredId = e.features[0].id;
    map.setFeatureState({ source: SOURCE_DICT[geo], id: hoveredId, sourceLayer:SOURCELAYER_DICT[geo]}, { hover: true });
  }
  return hoveredId
}
function removeHoverState(geo,hoveredId){
  if (hoveredId) {
    map.setFeatureState({ source: SOURCE_DICT[geo], id: hoveredId, sourceLayer:SOURCELAYER_DICT[geo]}, { hover: false });
  }
  hoveredId = null;
}

function setHoldState(e,geo,heldId){
  var geo = $('#geo-select').find(":selected").val();
  if (e.features.length > 0) {
    heldId = e.features[0].id;
    map.setFeatureState({ source: SOURCE_DICT[geo], id: heldId, sourceLayer:SOURCELAYER_DICT[geo]}, { hold: true });
  }
  return heldId
}
function removeHoldState(geo,heldId){
  if (heldId) {
    map.setFeatureState({ source: SOURCE_DICT[geo], id: heldId, sourceLayer:SOURCELAYER_DICT[geo]}, { hold: false });
  }
}

function onHoverStart(e,variable,geo){
  map.getCanvas().style.cursor = "crosshair";
  var geoid = e.features[0].properties.GEOID10
  var name = e.features[0].properties.NAME10
  var obj = map.getFeatureState({ source: SOURCE_DICT[geo], sourceLayer: SOURCELAYER_DICT[geo], id: geoid });
  var title = function (g, n) {
    if (n) return n
    else return g
  };
  var arr = createMoveTableArray([variable], title(geoid, name), obj)
  addMoveTable(arr)
}
function onHoverFinish(){
  map.getCanvas().style.cursor = "";
  $('#move').text("")
}

function onHoldStart(e,variable,geo){

}
function onHoldFinish(){

}
