function holdDistrict(e, heldDistricts){
  if (Object.keys(heldDistricts).length == 0 || $('#accumulate').is(":checked")){
    heldDistricts = setHoldState(e, heldDistricts);
    onHoldStart(e, heldDistricts)
  } else {
    heldDistricts = clearAllHolds()
  }
  return heldDistricts
}

const onHoverStart_style = () => {
  $('#move').css('padding',"5px")
  map.getCanvas().style.cursor = "crosshair";
}

const onHoverFinish_style = () => {
  $('#move').text("").css('padding',"0px");
  $("#flog_img").attr("src","");
  map.getCanvas().style.cursor = "";
}

const updateMoveTable = (e, geoid) => {
  let variable = SETTINGS['Variable'];
  let geo = SETTINGS['Geo']
  let geoidFeatureStates = map.getFeatureState({ source: SOURCE_DICT[geo], sourceLayer: SOURCELAYER_DICT[geo], id: geoid });
  let arr = createMoveTableArray([variable], e.features[0].properties.NAME10, geoidFeatureStates)
  addMoveTable(arr)
}
