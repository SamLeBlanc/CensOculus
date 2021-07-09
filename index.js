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
  collectSettings()
  let geo = SETTINGS['Geo'];
  showCurrentLayer()
  if (!hoversCreated.includes(geo)){
    setupHoverHoldStates(geo);
    hoversCreated.push(geo);
  }
}

const updateVariable = () => {
  collectSettings()
  setFeatStates()
  getQuantileValues()
}

const updateConcept = () => {
  let concept = SETTINGS['Concept'];
  if (!(concept in LORAX)) loadDataFromCSV(concept)
  getVariableListByConcept(concept)
  setTimeout(function(){
    createVariableDropdownSelect("variable-select-",VLbC[concept])
  }, 1000);
  setTimeout(function(){
    update()
  }, 2000);
}
