const setupHoverHoldStates = geo => {
  map.on('mousemove', LAYER_DICT[geo], e => onMouseMove(e) );
  map.on('mouseleave', LAYER_DICT[geo], () => onMouseLeave() );
  map.on('mousedown', LAYER_DICT[geo], e => onMouseDown(e) );
  map.on('mouseup', LAYER_DICT[geo], e => onMouseUp(e) );
}

let mouseDownCords;
let mouseUpCords;

const onMouseMove = e => {
  let geo = SETTINGS["Geo"];
  onHoverStart(e)
  removeHoverState(hoveredId)
  hoveredId = setHoverState(e, hoveredId)
}

const onMouseLeave = () => {
  let geo = SETTINGS["Geo"];
  onHoverFinish()
  removeHoverState(hoveredId)
}

const onMouseDown = (e) => {
  mouseDownCords = {x: event.pageX, y: event.pageY};
}

const isClick = (up,down) => (Math.abs(down.x - up.x) < 5 && Math.abs(down.y - up.y) < 5) ? true : false;

const onMouseUp = e => {
  mouseUpCords = {x: event.pageX, y: event.pageY};
  if (isClick(mouseUpCords, mouseDownCords)) {
    heldDistricts = holdDistrict(e, heldDistricts);
  }
}


function holdDistrict(e, heldDistricts){
  let geo = SETTINGS["Geo"];
  if (Object.keys(heldDistricts).length == 0 || $('#accumulate').is(":checked")){
    heldDistricts = setHoldState(e, heldDistricts);
    onHoldStart(e, heldDistricts)
  } else {
    heldDistricts = clearAllHolds()
  }
  if (Object.keys(heldDistricts).length == 0){
    clearAllHolds()
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
    removeSingleHold(id,geo)
  }
  return heldDistricts
}

const removeSingleHold = (id,geo) =>{
  delete heldDistricts[id];
  map.setFeatureState({ source: SOURCE_DICT[geo], id: id, sourceLayer:SOURCELAYER_DICT[geo]}, { hold: false });
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

const removeHoldState = heldDistricts => {
  let geo = SETTINGS['Geo'];
  Object.keys(heldDistricts).forEach(d => {
      map.setFeatureState({ source: SOURCE_DICT[geo], id: d, sourceLayer:SOURCELAYER_DICT[geo]}, { hold: false });
  });
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

const updateFlagSources = geoid => {
  if ($('#flag-mode').is(":checked")) {
    $('#flog_img').attr("src", retrieveFlagUrl(geoid));
    $('#flog_img2').attr("src", retrieveFlagUrl(geoid));
  }
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
    openNav2()
    updateBar(e)
  }
}

const onHoldFinish = () => {
  closeNav2()
}

const getBarArea = () => {
  let metersSq = d3.sum(Object.values(heldDistricts).map(d => d.ALAND10));
  return metersSq2MilesSq(metersSq);
}

const getBarPop = () => {
  let geo = SETTINGS["Geo"];
  return d3.sum(
    LORAX["P1"].filter(d => {
      return Object.values(heldDistricts).map(
        d => d.GEOID10).includes(d["GEOID10"]) &&
        d["SIZE"] == geo.toUpperCase()
      })
    .map(d => d.P001001)
  );
}

const multiName = () => {
  let geo = SETTINGS["Geo"];
  let len = Object.keys(heldDistricts).length;
  let suffix = getBarNameSuffix();
  return suffix ? `${len}\xa0${BAR_SUFFIX[geo]} in ${suffix}` : `${len}\xa0${BAR_SUFFIX[geo]}`;
}

const singleName = () => {
  let geoid = Object.keys(heldDistricts)[0];
  let name = Object.values(heldDistricts)[0].NAME10;
  return fixName(name, geoid)
}

const getBarName = () => Object.keys(heldDistricts).length > 1 ? multiName() : singleName();

const clearAllHolds = () => {
  let geo = SETTINGS['Geo'];
  onHoldFinish();
  removeHoldState(heldDistricts);
  return heldDistricts = {}
}

const allEqual = arr => arr.every( v => v === arr[0] );
const sameState = id_list => allEqual(id_list) ? true : false;
const sameCounty = id_list => allEqual(id_list.map(g => g.substring(0,2))) ? true : false;
const countySuffix = id_list => `${FULL_COUNTY_NAME[id_list[0]]}, ${CODE_TO_STATE[id_list[0].substring(0,2)]}`;
const stateSuffix = id_list => STATE_TO_NAME[CODE_TO_STATE[id_list[0].substring(0,2)]];

const getBarNameSuffix = () => {
  let geo = SETTINGS['Geo'];
  let check = (['state','county','tract','group','place','uschool','csub'].includes(geo)) ? true : false;
  if (!check) return false
  let id_list = Object.values(heldDistricts).map(d => d.GEOID10.substring(0,5));
  if (sameCounty(id_list)) return countySuffix(id_list)
  if (sameState(id_list)) return stateSuffix(id_list)
  else return null
}

const fixName = (name, geoid) => {
  let geo = SETTINGS['Geo']
  if (geo == 'county') name = FULL_COUNTY_NAME[geoid];
  if (geo == 'tract') name = `Tract in ${FULL_COUNTY_NAME[geoid.substring(0,5)]}`;
  if (geo == 'group') name = `Block Group in ${FULL_COUNTY_NAME[geoid.substring(0,5)]}`;
  if (['county','tract','group','uschool','csub','place'].includes(geo)){
    name = `${name}, ${CODE_TO_STATE[geoid.substring(0,2)]}`;
  }
  return name
}

const getBarGeoid = () => Object.keys(heldDistricts).length == 1 ? Object.keys(heldDistricts)[0] : null;

const regularWikiUrl = geoid => `https://en.wikipedia.org/wiki/${WIKI_NAME[geoid].replace(/ /g,"_")}`;
const placeWikiUrl = geoid => {
  let code = geoid.substring(0,2);
  let state = CODE_TO_STATE[code];
  let state_name = STATE_TO_NAME[state];
  let full = `${Object.values(heldDistricts)[0].NAME10}, ${state_name}`.replace(/ /g,"_");
  return `https://en.wikipedia.org/wiki/${full}`
}

const setWikiUrl = url_ => {
  $("#wiki-link").attr("href", url_)
  if ($('#wiki-mode').is(":checked")) window.open(url_,'_blank');
}

const getWikiUrl = geoid => {
  let geo = SETTINGS["Geo"];
  let url_ = null;
  if (['nation','state','county'].includes(geo)) url_ = regularWikiUrl(geoid);
  else if (['place'].includes(geo)) url_ = placeWikiUrl(geoid);
  if (url_) {
    setWikiUrl(url_)
    return url_
  }
}

const getBaseLoraxData = (geo,concept) => LORAX[concept].filter(d => (Object.keys(heldDistricts).includes(d.GEOID10) && d.SIZE == geo.toUpperCase() ) );

const getHeldLoraxData = (H,heldData) => {
  for (const v in H[0]) {
    if (typeof H[0][v] == 'number') heldData[v] = 0;
  }
  H.forEach(h => {
      for (const v in h) {
        if (typeof h[v] == 'number'){
          heldData[v] += h[v];
        }
      }
    })
  return heldData
}

const heldData2TableARRAY = heldData => {
  let arr = [];
  for (const v in heldData) {
    if (typeof heldData[v] == 'number'){
      n = heldData[v] / heldData[`${v.slice(0,4)}001`];
    }
    a = NICKNAMES[v] ? NICKNAMES[v] : null
    if (a && !['GEOID10','SIZE'].includes(v)) arr.push([a, numberWithCommas(heldData[v]), formatPercent(n)])
  }
  return arr
}

const getHeldData = () => {
  let geo = SETTINGS['Geo'];
  let concept = SETTINGS['Concept'];
  let heldData = {};
  let H = getBaseLoraxData(geo,concept);
  heldData = getHeldLoraxData(H, heldData);
  console.log(heldData)
  let arr = heldData2TableARRAY(heldData)
  addheldTable(arr)
}

const setBarText = (name, geoid, area, pop, den, flag_url_, wiki_url_) => {
  $('#b-name').text(name).css("font-weight","900")
  if (Object.keys(heldDistricts).length > 1){
    $('#b-geoid').text('n/a').css('color','grey')
  } else {
    $('#b-geoid').text(geoid).css('color','black')
  }
  $('#b-area').text(area)
  $('#b-pop').text(numberWithCommas(pop))
  $('#b-den').text(den)
  $('#flag-link').attr("href", flag_url_)
}

const updateBar = e => {
  let name = getBarName();
  let geoid = getBarGeoid();
  let area = getBarArea();
  let pop = getBarPop();
  let den = formatDensity(pop, area);
  if (area > 999) area = numberWithCommas(area)
  flag_url_ = retrieveFlagUrl(geoid)
  if (geoid) wiki_url_ = getWikiUrl(geoid);
  getHeldData()
  setBarText(name, geoid, area, pop, den, flag_url_, wiki_url_)
  console.log(`pop${pop} area${area} den${den}`)
}
