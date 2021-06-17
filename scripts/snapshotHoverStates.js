function setupHoverHoldStates(geo){
  map.on('mousemove', LAYER_DICT[geo], e => {
    onHoverStart(e, geo)
    removeHoverState(geo,hoveredId)
    hoveredId = setHoverState(e,geo,hoveredId)
  });
  map.on('mouseleave', LAYER_DICT[geo], () => {
    onHoverFinish()
    removeHoverState(geo,hoveredId)
  });
  map.on('mousedown', LAYER_DICT[geo], e => {
    down = {x: event.pageX, y: event.pageY};
  });
  map.on('mouseup', LAYER_DICT[geo], e => {
    up = {x: event.pageX, y: event.pageY};
    console.log('click')
    if (Math.abs(down.x - up.x) < 5 && Math.abs(down.y - up.y) < 5) {
      //click
      heldDistricts = holdDistrict(e,geo, heldDistricts)
      if (Object.keys(heldDistricts).length == 0){
        clearAllHolds()
      }
    } else {
      //drag
    }
  });
}

function holdDistrict(e, geo, heldDistricts){
  console.log('start -> holdDistrict',heldDistricts)
  if (Object.keys(heldDistricts).length == 0){
    console.log('length==0')
    heldDistricts = setHoldState(e, geo, heldDistricts);
    onHoldStart(e, geo, heldDistricts)
  } else if ($('#accumulate').is(":checked")){
    console.log('accumulate')
    heldDistricts = setHoldState(e, geo, heldDistricts);
    onHoldStart(e, geo, heldDistricts)
  } else {
    heldDistricts = clearAllHolds()
  }
  console.log('finish -> holdDistrict',heldDistricts)
  return heldDistricts
}

function setHoverState(e,geo,hoveredId){
  if (e.features.length > 0) {
    hoveredId = e.features[0].id;
    map.setFeatureState({ source: SOURCE_DICT[geo], id: hoveredId, sourceLayer:SOURCELAYER_DICT[geo]}, { hover: true });
  }
  return hoveredId
}

function removeHoverState(geo,hoveredId){
  if (hoveredId) map.setFeatureState({ source: SOURCE_DICT[geo], id: hoveredId, sourceLayer:SOURCELAYER_DICT[geo]}, { hover: false });
  hoveredId = null;
}

function setHoldState(e, geo, heldDistricts){
  console.log('set hold state')
  if (e.features.length > 0) {
    id = e.features[0].id;
    if (!heldDistricts.hasOwnProperty(id)) {
      heldDistricts[id] = {GEOID10: e.features[0].id, ALAND10: e.features[0].properties.ALAND10, NAME10: e.features[0].properties.NAME10}
    } else {
      console.log(`deleteing ${id}`)
      delete heldDistricts[id];
      map.setFeatureState({ source: SOURCE_DICT[geo], id: id, sourceLayer:SOURCELAYER_DICT[geo]}, { hold: false });
    }
    Object.keys(heldDistricts).forEach(h => {
      map.setFeatureState({ source: SOURCE_DICT[geo], id: h, sourceLayer:SOURCELAYER_DICT[geo]}, { hold: true });
    });
  }
  return heldDistricts
}
function removeHoldState(geo, heldDistricts){
  LORAX["P1"]
    .filter(d => d["SIZE"] == geo.toUpperCase())
    .map(d => d.GEOID10)
    .forEach(d => {
      map.setFeatureState({ source: SOURCE_DICT[geo], id: d, sourceLayer:SOURCELAYER_DICT[geo]}, { hold: false });
    });
}

function onHoverStart(e,geo){
  variable = $('#variable-select').find(":selected").val();
  map.getCanvas().style.cursor = "crosshair";
  let geoid = e.features[0].properties.GEOID10;
  var obj = map.getFeatureState({ source: SOURCE_DICT[geo], sourceLayer: SOURCELAYER_DICT[geo], id: geoid });
  var arr = createMoveTableArray([variable], e.features[0].properties.NAME10, obj)
  addMoveTable(arr)
  if ($('#flag-mode').is(":checked")) showFlag(geoid)
}

function onHoverFinish(){
  map.getCanvas().style.cursor = "";
  $('#move').text("")
  document.getElementById("flog_img").src = ""
}

function onHoldStart(e, geo, heldDistricts){
  if (Object.keys(heldDistricts).length > 0){
    updateBar(e, geo, heldDistricts)
  }
}

function onHoldFinish(){
  $("#bar").css("z-index", 0);
}

function getBarArea(){
  metersSq = d3.sum(Object.values(heldDistricts).map(d => d.ALAND10));
  return metersSq2MilesSq(metersSq)
}

function getBarPop(){
  pop = d3.sum(
    LORAX["P1"].filter(d => {
      return Object.values(heldDistricts).map(d => d.GEOID10).includes(d["GEOID10"]) && d["SIZE"] == geo.toUpperCase()
      })
    .map(d => d.P001001)
  );
  return pop
}

function getBarName(){
  if (Object.keys(heldDistricts).length > 1){
    //getBarNameSuffix()
    return Object.keys(heldDistricts).length.toString()
  } else {
    geoid = Object.keys(heldDistricts)[0];
    name = Object.values(heldDistricts)[0].NAME10;
    return fixName(name, geoid)
  }
}

function clearAllHolds(){
  geo = $('#geo-select').find(":selected").val();
  onHoldFinish();
  removeHoldState(geo, heldDistricts);
  heldDistricts = {};
  return heldDistricts
  console.log('clearAllHolds',heldDistricts)
}

function getBarNameSuffix(){
  let check = false;
  if (['state','county','tract','group','place','uschool','csub'].includes(geoid)){
    check = true;
  }
  const allEqual = arr => arr.every( v => v === arr[0] );
  geoids = Object.values(heldDistricts).map(d => d.GEOID10);
  if (geoids[0].length > 2){
    geoids = geoids.map(d => d.substring(0,5))
    if (allEqual(geoids)) console.log(FULL_COUNTY_NAME[geoids[0]])
  }
}

function fixName(name, geoid){
  if (geo == 'county') name = FULL_COUNTY_NAME[geoid];
  else if (geo == 'tract') name = `Tract in ${FULL_COUNTY_NAME[geoid.substring(0,5)]}`;
  else if (geo == 'group') name = `Block Group in ${FULL_COUNTY_NAME[geoid.substring(0,5)]}`;
  if (['county','tract','group','uschool','csub','place'].includes(geo)){
    name = `${name}, ${CODE_TO_STATE[geoid.substring(0,2)]}`;
  }
  return name
}

function getBarGeoid(){
  if (Object.keys(heldDistricts).length > 1){
    return null
  } else {
    return Object.keys(heldDistricts)[0];
  }
}

function getWikiUrl(){
  if (['nation','state','county'].includes(geo)){
    full = WIKI_NAME[geoid].replace(/ /g,"_");
  } else if (['place'].includes(geo)) {
    let code = geoid.substring(0,2);
    let state = CODE_TO_STATE[code]
    let nam = STATE_TO_NAME[state];
    full = `${Object.values(heldDistricts)[0].NAME10}, ${nam}`.replace(/ /g,"_");
  }
	return `https://en.wikipedia.org/wiki/${full}`
}

function setBarText(){
  $('#b-name').text(name)
  if (Object.keys(heldDistricts).length > 1){
    $('#b-geoid').css('color','grey')
    $('#b-geoid').text('n/a')
  } else {
    $('#b-geoid').css('color','black')
    $('#b-geoid').text(geoid)
  }
  $('#b-area').text(area)
  $('#b-pop').text(numberWithCommas(pop))
  $('#b-den').text(den)
  //$("#wiki-link").attr("href", wikiUrl)
}

function updateBar(e, geo, heldDistricts){
  console.log('updating bar')
  $("#bar").css("z-index",20);
  geoid = getBarGeoid();
  area = getBarArea();
  pop = getBarPop();
  den = formatDensity(pop, area);
  name = getBarName();
  //if (geoid) wikiUrl = getWikiUrl(geoid);
  //else wikiUrl = null
  if (area > 999) area = numberWithCommas(area)
  setBarText()

}
