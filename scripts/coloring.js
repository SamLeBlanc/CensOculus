const hideAllLayers = () => {
  Object.keys(SOURCE_DICT).forEach( k => {
    map.setLayoutProperty(`${k}-fills`,'visibility','none')
    map.setLayoutProperty(`${k}-lines`,'visibility','none')
    map.setLayoutProperty(`${k}-3d`,'visibility','none')
  });
}
const showCurrentLayer = (geo) => {
  map.setLayoutProperty(`${geo}-fills`,'visibility','visible')
  map.setLayoutProperty(`${geo}-lines`,'visibility','visible')
  map.setLayoutProperty(`${geo}-3d`,'visibility','visible')
}


const setLinePaint = () => {
  let c1 = customColors[5] ? customColors[5] : "#e72cdc"
  let c2 = customColors[6] ? customColors[6] : "#32cc32"
  map.setPaintProperty(`${SETTINGS['Geo']}-lines`,'line-color',
    ['case',
    ['boolean', ['feature-state', 'hold'], false], c1,
    ['boolean', ['feature-state', 'hover'], false], c2, 'black',
  ]);
  map.setPaintProperty(`${SETTINGS['Geo']}-lines`,'line-width',
    ['case',
    ['boolean', ['feature-state', 'hold'], false], 6,
    ['boolean', ['feature-state', 'hover'], false], 4,
    ['boolean', ['feature-state', 'flag'], false], 1, 0,
  ]);
  map.setPaintProperty(`${SETTINGS['Geo']}-lines`,'line-opacity',
    ['case',
    ['boolean', ['feature-state', 'hold'], false], 1,
    ['boolean', ['feature-state', 'hover'], false], 1,
    ['boolean', ['feature-state', 'flag'], false], 1, 0.05,
  ]);
}
const setFillPaint = (arr, colors) => {
  updateFillOpacity()
  map.setPaintProperty(`${SETTINGS['Geo']}-fills`, 'fill-color',
    ['interpolate',
    ['linear'], ['feature-state', SETTINGS['Variable']],
    arr[0], colors[0],
    arr[1], colors[1],
    arr[2], colors[2],
    arr[3], colors[3],
    arr[4], colors[4]
  ]);
}
const set3DPaint = (arr, colors) => {
  let geo = SETTINGS['Geo'];
  let variable = SETTINGS['Variable'];
  let c1 = customColors[5] ? customColors[5] : "#e72cdc"
  let c2 = customColors[6] ? customColors[6] : "#32cc32"
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
  update3DVisibility()
}
const updateFillOpacity = () => {
  map.setPaintProperty(`${SETTINGS['Geo']}-fills`, 'fill-opacity', parseFloat($('#tileopacity-v').val()));
  $('#to-label').text($('#tileopacity-v').val());
}
const update3DVisibility = () => {
  let geo = SETTINGS['Geo'];
  if ($('#3d-mode').is(":checked")){
    map.setPaintProperty(`${geo}-fills`, 'fill-opacity',0.0);
    map.setPaintProperty(`${geo}-3d`, 'fill-extrusion-opacity',0.8);
    map.setPaintProperty(`${geo}-lines`, 'line-opacity',0.0);
    map.flyTo({pitch: 10, essential: true});
  } else {
    map.setPaintProperty(`${geo}-3d`, 'fill-extrusion-opacity',0);
    updateFillOpacity()
    setLinePaint()
    map.flyTo({pitch: 0, essential: true});
  }
}



// Reverses the order of the current color scheme
function reverseColorScale(){
  let scheme = SETTINGS['Scheme'];
  COLOR_DICT[scheme] = COLOR_DICT[scheme].reverse();
  update();
}

function colorLinear(){
  let fiveStep = {};
  if (customRanges["linearMin"] != null) {
    fiveStep[0] = customRanges["linearMin"];
    fiveStep[4] = customRanges["linearMax"];
  } else {
    fiveStep[0] = QSummary[0];
    fiveStep[4] = QSummary[1];
  }
  let range = fiveStep[4] - fiveStep[0];
  fiveStep[1] = fiveStep[0] + range*0.25;
  fiveStep[2] = fiveStep[0] + range*0.5;
  fiveStep[3] = fiveStep[0] + range*0.75;
  return fiveStep
}

function colorQuantile(){
  let fiveStep = {};
  if (customRanges["quantileQ0"] != null) {
    fiveStep[0] = customRanges["quantileQ0"];
    fiveStep[1] = customRanges["quantileQ1"];
    fiveStep[2] = customRanges["quantileQ2"];
    fiveStep[3] = customRanges["quantileQ3"];
    fiveStep[4] = customRanges["quantileQ4"];
  } else {
    fiveStep[0] = QSummary[0];
    fiveStep[1] = QSummary[0.25];
    fiveStep[2] = QSummary[0.5];
    fiveStep[3] = QSummary[0.75];
    fiveStep[4] = QSummary[1];
  }
  return fiveStep
}

const fiveStepAdjustment = arr => {
  for (i=0; i < arr.length; i++){
    arr[i] += ((i-2) * .0000001)
  }
  return arr
}

const addCustomColor = i => {
  customColors[i] = $(`#cpick-${i}`).val()
  update()
}

function getCustomColors(colors){
  customColors.forEach((element, i) => {
    if (element != null) colors[i] = customColors[i]
  });
  return colors
}



function updateLegend(arr, colors){
  var scheme = SETTINGS['Scheme']
  var colors = COLOR_DICT[scheme]

  $(`#leg-square-5`).css("border", `solid 5px ${customColors[5]}`)
  $(`#leg-square-6`).css("border", `solid 5px ${customColors[6]}`)
  for (i = 0; i < 5; i++){
    if (colors[i].includes('#')){
      var col = hexToRgb(colors[i])
      colors[i] = `rgba(${col.r}, ${col.g}, ${col.b}, 1)`
    }
    $(`#leg-square-${i}`).css("background", colors[i])
    $(`#leg-label-${i}`).text(formatNumber(Math.max(arr[i],0)))
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
