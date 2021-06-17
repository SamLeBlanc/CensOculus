function main(){
  loadDataFromCSV("P1")
  $('#bar').css("left","70%")
  loadFlagData()
  setUpAll()
  getVariableLabelList()
  addSources()
  addFillAndLineLayers()
  //setTimeout(function(){ update() }, 2000);
}

function update(){
  console.log('updating')
  updateGeo()
  updateVariable()
  updateFlagMode()
}

let hoversCreated = [];

function updateGeo(){
  hideAllLayers()
  clearAllHolds()
  geo = $('#geo-select').find(":selected").val();
  map.setLayoutProperty(geo.concat('-fills'),'visibility','visible')
  map.setLayoutProperty(geo.concat('-lines'),'visibility','visible')
  if (!hoversCreated.includes(geo)){
    setupHoverHoldStates(geo);
    hoversCreated.push(geo);
  }

}

function updateVariable(){
  variable = $('#variable-select').find(":selected").val();
  geo = $('#geo-select').find(":selected").val();
  concept = $('#concept-select').find(":selected").val();
  scale = $('#scale-select').find(":selected").val();
  setFeatStates(variable)
  layer_name = geo.concat('-fills')
  quants = getQuantileValues(concept, variable, geo, scale)
  colorLayer(layer_name, variable, quants)
}

function updateConcept(){
  concept = $('#concept-select').find(":selected").val();
  getVariableListByConcept(concept)
  setTimeout(function(){
    createVariableDropdownSelect("SS",VLbC[concept])
    if (!(concept in LORAX)) loadDataFromCSV(concept)
  }, 1000);
  setTimeout(function(){
    update()
  }, 2000);
}
