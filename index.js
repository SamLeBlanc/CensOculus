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
  map.setLayoutProperty(geo.concat('-3d'),'visibility','visible')
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

function set3DColor(arr, colors){
  map.setPaintProperty(geo.concat('-3d'), 'fill-extrusion-color', ['case',
  ['boolean', ['feature-state', 'hold'], false], 'rgb(255,0,255)',
    ['boolean', ['feature-state', 'hover'], false], 'rgb(255,255,0)',
    ['interpolate',
    ['linear'], ['feature-state', variable],
    arr[0], colors[0],
    arr[1], colors[1],
    arr[2], colors[2],
    arr[3], colors[3],
    arr[4], colors[4]
  ],
  ]);
  map.setPaintProperty(geo.concat('-3d'), 'fill-extrusion-height', ['case',
    ['!=', ['feature-state', variable], null],
    ['interpolate',
      ['linear'], ['feature-state', variable],
      arr[0], 0.5,
      arr[4], parseFloat($('#height').val())
    ],
  0
  ]);
  if (value = $('#3d-mode').is(":checked")){
    map.setPaintProperty(geo.concat('-fills'), 'fill-opacity',0.0);
    map.setPaintProperty(geo.concat('-3d'), 'fill-extrusion-opacity',0.8);
    map.setPaintProperty(geo.concat('-lines'), 'line-opacity',0.0);
    map.flyTo({pitch: 10, essential: true});
  } else {
    map.setPaintProperty(geo.concat('-3d'), 'fill-extrusion-opacity',0);
    map.setPaintProperty(geo.concat('-fills'), 'fill-opacity',0.8);
    map.setPaintProperty(geo.concat('-lines'), 'line-opacity',1);
    map.flyTo({pitch: 0, essential: true});
  }
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
