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
    onHoldFinish()
    removeHoldState(geo,heldId);
    heldId = null;
  } else {
    heldDistrict = true;
    heldId = setHoldState(e,heldId);
    onHoldStart(e,heldId,geo)
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
  var pic = document.getElementById("flog_img");
  u = URLy(geoid)
  if (u) {
    if (u.substring(0,5) != '/imag'){
      pic.src = u
    } else {
      pic.src = "https://www.crwflags.com/fotw".concat(u)
    }
  } else {
    pic.src = "images/noFlag.gif"
  }
}
function onHoverFinish(){
  map.getCanvas().style.cursor = "";
  $('#move').text("")
  document.getElementById("flog_img").src = ""
}

function onHoldStart(e,heldId,geo){
  updateBar(e, heldId)
  var concept = $('#concept-select').find(":selected").val();
  var geo = $('#geo-select').find(":selected").val();
  L = LORAX[concept].filter(function(d){ return (d["GEOID10"] == heldId && d["SIZE"] == geo.toUpperCase() )})
  console.log(L)
}

function onHoldFinish(){
  $("#bar").css("z-index", 0);
}

function updateBar(e, id){
  $("#bar").css("z-index",20);
  var geo = $('#geo-select').find(":selected").val();
  var obj = map.getFeatureState({ source: SOURCE_DICT[geo], sourceLayer: SOURCELAYER_DICT[geo], id: heldId });

  metersSq = parseInt(e.features[0].properties.ALAND10)
  area = metersSq2MilesSq(metersSq)

  geoid = e.features[0].properties.GEOID10
  name = e.features[0].properties.NAME10
  pop = LORAX["P1"].filter(function(d){ return d["GEOID10"] == e.features[0].properties.GEOID10 && d["SIZE"] == geo.toUpperCase()})
  den = formatDensity(pop[0].P001001,area)

  if (area > 999) area = numberWithCommas(area)
  if (geo == 'county') name = FULL_COUNTY_NAME[geoid];

  $('#b-name').text(name)
  $('#b-geoid').text(geoid)
  $('#b-area').text(`${area} sq mi`)
  $('#b-pop').text(`${numberWithCommas(pop[0].P001001)} 👤`)
  $('#b-den').text(`${den} 👤 / sq mi`)
}
