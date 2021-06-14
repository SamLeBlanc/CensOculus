function getHoverHoldStates(variable,geo){
  heldIds = removeHoldState(geo, heldIds)
  map.on('mousemove', LAYER_DICT[geo], e => {
    onHoverStart(e,variable,geo)
    hoveredId = setHoverState(e,geo,hoveredId)
  });
  map.on('mouseleave', LAYER_DICT[geo], () => {
    onHoverFinish()
    removeHoverState(geo,hoveredId)
  });
  map.on('mousedown', LAYER_DICT[geo], e => {
    startX = event.pageX;
    startY = event.pageY;
  });
  map.on('mouseup', LAYER_DICT[geo], e => {
    diffX = Math.abs(event.pageX - startX);
    diffY = Math.abs(event.pageY - startY);
    if (diffX < 5 && diffY < 5) {
      //click
      heldIds = holdDistrict(e,geo,heldIds, heldEvents)
    } else {
      //drag
    }
  });
}

function holdDistrict(e,geo,heldIds, heldEvents){
  if (heldIds.length > 0 && !$('#accumulate').is(":checked")){
    heldDistrict = false;
    onHoldFinish()
    heldIds = removeHoldState(geo,heldIds);
    heldIds = [];
    heldEvents = [];
  } else {
    heldDistrict = true;
    heldIds = setHoldState(e,heldIds, heldEvents);
    if (heldIds.length > 0){
      onHoldStart(e,heldIds,geo, heldEvents)
    } else {
      onHoldFinish()
    }
  }
  return heldIds
}

function setHoverState(e,geo,hoveredId){
  if (e.features.length > 0) {
    if (hoveredId) map.setFeatureState({ source: SOURCE_DICT[geo], id: hoveredId, sourceLayer:SOURCELAYER_DICT[geo]}, { hover: false });
    hoveredId = e.features[0].id;
    map.setFeatureState({ source: SOURCE_DICT[geo], id: hoveredId, sourceLayer:SOURCELAYER_DICT[geo]}, { hover: true });
  }
  return hoveredId
}
function removeHoverState(geo,hoveredId){
  if (hoveredId) map.setFeatureState({ source: SOURCE_DICT[geo], id: hoveredId, sourceLayer:SOURCELAYER_DICT[geo]}, { hover: false });
  hoveredId = null;
}

function removeEvent(id, heldIds, heldEvents){
  index = heldIds.indexOf(id)
  console.log('splice',index)
  heldIds.splice(index, 1);
  heldEvents.splice(index, 1);
  map.setFeatureState({ source: SOURCE_DICT[geo], id: id, sourceLayer:SOURCELAYER_DICT[geo]}, { hold: false });
  return heldEvents
}

function setHoldState(e, heldIds, heldEvents){
  var geo = $('#geo-select').find(":selected").val();
  if (e.features.length > 0) {
    id = e.features[0].id;
    if (!heldIds.includes(id)) {
      heldIds.push(e.features[0].id)
      heldEvents.push({GEOID10: e.features[0].id, ALAND10: e.features[0].properties.ALAND10, NAME10: e.features[0].properties.NAME10})
    } else {
      heldEvents = removeEvent(id, heldIds, heldEvents)
    }
    heldIds.forEach(h => {
      map.setFeatureState({ source: SOURCE_DICT[geo], id: h, sourceLayer:SOURCELAYER_DICT[geo]}, { hold: true });
    });
  }
  console.log(heldIds)
  return heldIds
}
function removeHoldState(geo, heldIds){
  heldIds.forEach(h => {
    map.setFeatureState({ source: SOURCE_DICT[geo], id: h, sourceLayer:SOURCELAYER_DICT[geo]}, { hold: false });
  });
  heldIds = [];
  return heldIds
}

function onHoverStart(e,variable,geo){
  map.getCanvas().style.cursor = "crosshair";
  let geoid = e.features[0].properties.GEOID10;
  var obj = map.getFeatureState({ source: SOURCE_DICT[geo], sourceLayer: SOURCELAYER_DICT[geo], id: geoid });
  var arr = createMoveTableArray([variable], e.features[0].properties.NAME10, obj)
  addMoveTable(arr)
  var pic = document.getElementById("flog_img");
  suffix = getFlagUrlSuffix(geoid)
  fullUrl = craftFlagUrl(suffix)
  $('#flog_img').attr("src", fullUrl);

}

function onHoverFinish(){
  map.getCanvas().style.cursor = "";
  $('#move').text("")
  document.getElementById("flog_img").src = ""
}

function onHoldStart(e,heldIds,geo, heldEvents){
  updateBar(e, heldIds, heldEvents)
}

function onHoldFinish(){
  $("#bar").css("z-index", 0);
}

function getHeld(){
  var obj = map.getFeatureState({ source: SOURCE_DICT[geo], sourceLayer: SOURCELAYER_DICT[geo], id: heldId });
  console.log(obj)
}

function updateBar(e, id, heldEvents){
  $("#bar").css("z-index",20);
  var geo = $('#geo-select').find(":selected").val();
  var obj = map.getFeatureState({ source: SOURCE_DICT[geo], sourceLayer: SOURCELAYER_DICT[geo], id: heldIds[0] });
  console.log(heldEvents)

  metersSq = d3.sum(heldEvents.map(d => d.ALAND10))
  area = metersSq2MilesSq(metersSq)

  geoid = heldEvents[0].GEOID10
  geoids = heldEvents.map(d => d.GEOID10);
  name = heldEvents[0].NAME10
  pop = d3.sum(
    LORAX["P1"]
    .filter(d => {
      return heldEvents.map(d => d.GEOID10).includes(d["GEOID10"]) &&
        d["SIZE"] == geo.toUpperCase()
      })
    .map(d => d.P001001)
  );
  den = formatDensity(pop,area)

  if (area > 999) area = numberWithCommas(area)
  if (geo == 'county') name = FULL_COUNTY_NAME[geoid];
  if (geo == 'tract') name = `Tract in ${FULL_COUNTY_NAME[geoid.substring(0,5)]}`
  if (geo == 'group') name = `Block Group in ${FULL_COUNTY_NAME[geoid.substring(0,5)]}`
  if (['county','tract','group','uschool','csub','place'].includes(geo)){
    name = `${name}, ${CODE_TO_STATE[geoid.substring(0,2)]}`
  }


  var geo = $('#geo-select').find(":selected").val();
  if (['nation','state','county'].includes(geo)){
    full = WIKI_NAME[geoid].replace(/ /g,"_");
  } else if(['place'].includes(geo)) {
    let code = geoid.substring(0,2);
    let state = CODE_TO_STATE[code]
    let nam = STATE_TO_NAME[state];
    full = `${heldEvents[0].NAME10}, ${nam}`.replace(/ /g,"_");
  }

	U = `https://en.wikipedia.org/wiki/${full}`
  if (heldIds.length > 1){
    $('#b-name').text(heldIds.length)
  } else {
    $('#b-name').text(name)
  }

  if (heldIds.length > 1){
    $('#b-geoid').css('color','grey')
    $('#b-geoid').text('n/a')
  } else {
    $('#b-geoid').css('color','black')
    $('#b-geoid').text(geoid)
  }
  $('#b-area').text(area)
  $('#b-pop').text(numberWithCommas(pop))
  $('#b-den').text(den)
  $("#wiki-link").attr("href", U)
}
