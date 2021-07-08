const showCurrentLayer = () => {
  hideAllLayers()
  setLayerVisibility()
}
const hideAllLayers = () => {
  Object.keys(SOURCE_DICT).forEach( geo => {
    map.setLayoutProperty(`${geo}-fills`,'visibility','none');
    map.setLayoutProperty(`${geo}-lines`,'visibility','none');
    map.setLayoutProperty(`${geo}-3d`,'visibility','none');
  });
}
const setLayerVisibility = () => {
  let geo = SETTINGS['Geo'];
  if ($('#3d-mode').is(":checked")){
    map.setLayoutProperty(`${geo}-fills`,'visibility','none');
    map.setLayoutProperty(`${geo}-3d`,'visibility','visible');
      map.setLayoutProperty(`${geo}-lines`,'visibility','none');
    map.flyTo({pitch: 10, essential: true});
  } else {
    map.setLayoutProperty(`${geo}-fills`,'visibility','visible');
    map.setLayoutProperty(`${geo}-3d`,'visibility','none');
    map.flyTo({pitch: 0, essential: true});
    map.setLayoutProperty(`${geo}-lines`,'visibility','visible');
  }
}

const setLinePaint = () => {
  setLineColor()
  setLineWidth()
  setLineOpacity()
}
const setFillPaint = (arr, colors) => {
  setFillOpacity()
  setFillColor(arr,colors)
}
const setExtrusionPaint = (arr, colors) => {
  setExtrusionColor(arr,colors)
  setExtrusionHeight(arr)
  setExtrusionOpacity()
}

const setLineColor = () => {
  let c1 = customColors[5] ? customColors[5] : "#e72cdc";
  let c2 = customColors[6] ? customColors[6] : "#32cc32";
  map.setPaintProperty(`${SETTINGS['Geo']}-lines`,'line-color',
    ['case',
    ['boolean', ['feature-state', 'hold'], false], c1,
    ['boolean', ['feature-state', 'hover'], false], c2, 'black',
  ]);
}
const setLineWidth = () => {
  map.setPaintProperty(`${SETTINGS['Geo']}-lines`,'line-width',
    ['case',
    ['boolean', ['feature-state', 'hold'], false], 6,
    ['boolean', ['feature-state', 'hover'], false], 4,
    ['boolean', ['feature-state', 'flag'], false], 1, 0,
  ]);
}
const setLineOpacity = () => {
  map.setPaintProperty(`${SETTINGS['Geo']}-lines`,'line-opacity',
    ['case',
    ['boolean', ['feature-state', 'hold'], false], 1,
    ['boolean', ['feature-state', 'hover'], false], 1,
    ['boolean', ['feature-state', 'flag'], false], 1, 0.05,
  ]);
}

const setFillOpacity = () => {
  map.setPaintProperty(`${SETTINGS['Geo']}-fills`, 'fill-opacity', parseFloat($('#tileopacity-v').val()));
  $('#to-label').text($('#tileopacity-v').val()); // needed? not sure
}
const setFillColor = (arr,colors) => {
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

const setExtrusionColor = (arr,colors) => {
  let c1 = customColors[5] ? customColors[5] : "#e72cdc"
  let c2 = customColors[6] ? customColors[6] : "#32cc32"
  map.setPaintProperty(`${SETTINGS['Geo']}-3d`, 'fill-extrusion-color',
    ['case',
    ['boolean', ['feature-state', 'hold'], false],c1,
    ['boolean', ['feature-state', 'hover'], false], c2,
    ['interpolate',
    ['linear'], ['feature-state', SETTINGS['Variable']],
      arr[0], colors[0],
      arr[1], colors[1],
      arr[2], colors[2],
      arr[3], colors[3],
      arr[4], colors[4]
    ],
  ]);
}
const setExtrusionHeight = arr => {
  map.setPaintProperty(`${SETTINGS['Geo']}-3d`, 'fill-extrusion-height',
    ['interpolate',
    ['linear'], ['feature-state', SETTINGS['Variable']],
    arr[0], 0.5,
    arr[4], parseFloat($('#height').val())
  ]);
}
const setExtrusionOpacity = () => {
  map.setPaintProperty(`${SETTINGS['Geo']}-3d`, 'fill-extrusion-opacity', parseFloat($('#tileopacity-v').val()));
}
