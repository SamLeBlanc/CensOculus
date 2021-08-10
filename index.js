const main = () => {
  collectSettings()
  loadDataFromCSV("P1")
  loadFlagData()
  setUpAll()
  getVariableLabelList()
  addSources()
  addFillLineExtrusionLayers()
}
const update = () => {
  console.log('updating')
  collectSettings()
  updateGeo()
  updateVariable()
  updatePaint()
  updateFlag()
}

const updatePaint = () => {
  console.log('coloring');
  let colors = COLOR_DICT[SETTINGS['Scheme']];
  colors = getCustomColors(colors);
  let fiveStep = ( SETTINGS['Scale'] == "Linear") ? colorLinear() : colorQuantile();
  let fiveStep_values = Object.values(fiveStep).sort((a, b) => a - b);
  fiveStep_values = fiveStepAdjustment(fiveStep_values);
  updateLegend(fiveStep_values, colors);
  setLinePaint();
  setFillPaint(fiveStep_values, colors);
  setExtrusionPaint(fiveStep_values, colors);
  setLayerVisibility();
}

let hoversCreated = [];
const updateGeo = () => {
  hideAllLayers()
  clearAllHolds()
  let geo = SETTINGS['Geo'];
  showCurrentLayer()
  if (!hoversCreated.includes(geo)){
    setupHoverHoldStates(geo);
    hoversCreated.push(geo);
  }
}

const updateVariable = () => {
  setFeatStates()
  getQuantileValues()
}

const updateConcept = () => {
  let concept = SETTINGS['Concept'];
  if (!(concept in LORAX)) loadDataFromCSV(concept)
  getVariableListByConcept(concept)
  setTimeout(function(){
    createVariableDropdownSelect("variable-select-",VLbC[concept])
    createVariableDropdownSelect("variable-select-1",VLbC[concept])
    createVariableDropdownSelect("variable-select-2",VLbC[concept])
  }, 2000);
  setTimeout(function(){
    update()
  }, 3000);
}

////==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==
///==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==
//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==//==

const addTag = () => {
  let id = $('#b-name').text()
  taggedDistricts[id] = {
    id: id,
    geoids: Object.values(heldDistricts).map(h => h.GEOID10),
    names: Object.values(heldDistricts).map(h => h.NAME10),
  }
  dispayTags();
}

const dispayTags = () => {
  $('#tag-text').text("");
  Object.keys(taggedDistricts).forEach(t => {
    $('#tag-text').append(`${taggedDistricts[t].id}<br>`)
  })
}

const loadingIcon = () => {
  map.on('idle', function() {
      $('#loading').css('left','-500px')
      var d = new Date();
      startTime = d.getTime();
  });

  map.on('render', function() {
      var d = new Date();
      endTime = d.getTime();
      if(endTime - startTime > 1000) $('#loading').css('left',`${$('#title').width() + 25}px`)
  });
}
