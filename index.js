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

function updatePaint(){

}

function updateTitle(){
  if (window.innerWidth < 450){
    $('#title').css('font-size',35)
  } else {
    $('#title').css('font-size',60)
  }
  const randomColor = () => Math.floor(Math.random()*16777215).toString(16);
  const randomLineColor = () => Math.floor(Math.floor(1 + Math.random()*3)*5592405).toString(16);
  $('#title').css('color',`#${randomColor()}`)
  $('#title').css('-webkit-text-stroke',`1.5px #${randomLineColor()}`)
}


let hoversCreated = [];

function updateGeo(){
  hideAllLayers()
  clearAllHolds()
  geo = $('#geo-select').find(":selected").val();
  map.setLayoutProperty(`${geo}-fills`,'visibility','visible')
  map.setLayoutProperty(`${geo}-lines`,'visibility','visible')
  map.setLayoutProperty(`${geo}-3d`,'visibility','visible')
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
  quants = getQuantileValues(concept, variable, geo, scale)
  colorLayer()
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

function setLinePaint(){
  let geo = $('#geo-select').find(":selected").val();
  c1 = customColors[5] ? customColors[5] : "#e72cdc"
  c2 = customColors[6] ? customColors[6] : "#32cc32"
  map.setPaintProperty(`${geo}-lines`,'line-color',
    ['case',
      ['boolean', ['feature-state', 'hold'], false], c1,
      ['boolean', ['feature-state', 'hover'], false], c2, 'black',
    ]);
  map.setPaintProperty(`${geo}-lines`,'line-width',
    ['case',
      ['boolean', ['feature-state', 'hold'], false], 6,
      ['boolean', ['feature-state', 'hover'], false], 4,
      ['boolean', ['feature-state', 'flag'], false], 1, 0,
    ]);
  map.setPaintProperty(`${geo}-lines`,'line-opacity',
    ['case',
      ['boolean', ['feature-state', 'hold'], false], 1,
      ['boolean', ['feature-state', 'hover'], false], 1,
      ['boolean', ['feature-state', 'flag'], false], 1, 0.05,
    ]);
}

function setFillPaint(arr, colors){
  let geo = $('#geo-select').find(":selected").val();
  map.setPaintProperty(`${geo}-fills`, 'fill-opacity', 0.8);
  map.setPaintProperty(`${geo}-fills`, 'fill-color',
    ['interpolate',
      ['linear'], ['feature-state', variable],
      arr[0], colors[0],
      arr[1], colors[1],
      arr[2], colors[2],
      arr[3], colors[3],
      arr[4], colors[4]
    ]);
}


function set3DPaint(arr, colors){
  let geo = $('#geo-select').find(":selected").val();
  c1 = customColors[5] ? customColors[5] : "#e72cdc"
  c2 = customColors[6] ? customColors[6] : "#32cc32"
  map.setPaintProperty(`${geo}-3d`, 'fill-extrusion-color',
  ['case',
    ['boolean', ['feature-state', 'hold'], false],c1,
    ['boolean', ['feature-state', 'hover'], false], c2,
    ['interpolate',
      ['linear'], ['feature-state', variable],
      arr[0], colors[0],
      arr[1], colors[1],
      arr[2], colors[2],
      arr[3], colors[3],
      arr[4], colors[4]
    ],
  ]);
  map.setPaintProperty(`${geo}-3d`, 'fill-extrusion-height',
    ['interpolate',
      ['linear'], ['feature-state', variable],
      arr[0], 0.5,
      arr[4], parseFloat($('#height').val())
    ]);

  if (value = $('#3d-mode').is(":checked")){
    map.setPaintProperty(`${geo}-fills`, 'fill-opacity',0.0);
    map.setPaintProperty(`${geo}-3d`, 'fill-extrusion-opacity',0.8);
    map.setPaintProperty(`${geo}-lines`, 'line-opacity',0.0);
    map.flyTo({pitch: 10, essential: true});
  } else {
    map.setPaintProperty(`${geo}-3d`, 'fill-extrusion-opacity',0);
    map.setPaintProperty(`${geo}-fills`, 'fill-opacity',0.8);
    setLinePaint()
    map.flyTo({pitch: 0, essential: true});
  }
}
