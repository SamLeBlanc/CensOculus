function setHoverStates(variable,geo){
  map.on('mousemove', LAYER_DICT[geo], function (e) {
    if (e.features.length > 0) {
      if (hoveredStateId) {
        onHoverStart(e,variable,geo)
        map.setFeatureState({ source: SOURCE_DICT[geo], id: hoveredStateId, sourceLayer:SOURCELAYER_DICT[geo]}, { hover: false });
      }
      hoveredStateId = e.features[0].id;
      map.setFeatureState({ source: SOURCE_DICT[geo], id: hoveredStateId, sourceLayer:SOURCELAYER_DICT[geo]}, { hover: true });
    }
  });
  map.on('mouseleave', LAYER_DICT[geo], function () {
    onHoverFinish()
    if (hoveredStateId) {
      map.setFeatureState({ source: SOURCE_DICT[geo], id: hoveredStateId, sourceLayer:SOURCELAYER_DICT[geo]}, { hover: false });
    }
    hoveredStateId = null;
  });
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
