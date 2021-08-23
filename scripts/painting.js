//// Methods pertaining to the *painting* of mapbox tile layers (this includes, visibility, color, extrusion, opacity, and lines)
// That is, the actual application of the colors to the layers
// We are not finding the colors here, that has already been done in coloring.js
// instead we are just *applying* those colors

//// There are three types of layers that are being painted here, fills, lines, and extrusions (3D)

// Combo method, Hides all layers and sets visibility for current layer
// all three layers (line, fill, extrusion) are loaded in earlier, but now we choose which one to see
const showCurrentLayer = () => {
  hideAllLayers()
  setLayerVisibility()
}

// Sets the visibility of all layers (line,fill,extrusion) for all geos to none (invisible) also sets nativelands to invisible
const hideAllLayers = () => {
  Object.keys(SOURCE_DICT).forEach( geo => {
    map.setLayoutProperty(`${geo}-fills`,'visibility','none');
    map.setLayoutProperty(`${geo}-lines`,'visibility','none');
    map.setLayoutProperty(`${geo}-3d`,'visibility','none');
  });
  map.setLayoutProperty('nativelands','visibility','none');
}

// Make visible only the desired layer based on the SETTINGS
const setLayerVisibility = () => {
  let geo = SETTINGS['Geo'];
  if (SETTINGS['3D']){                                            // if we are in 3D mode
    map.setLayoutProperty(`${geo}-fills`,'visibility','none');
    map.setLayoutProperty(`${geo}-3d`,'visibility','visible');
    map.setLayoutProperty(`${geo}-lines`,'visibility','none');
    map.getPitch() < 10 ? map.flyTo({pitch: 10, essential: true}) : false;
  } else {                                                        // normal (2D) mode
    map.setLayoutProperty(`${geo}-fills`,'visibility','visible');
    map.setLayoutProperty(`${geo}-3d`,'visibility','none');
    map.setLayoutProperty(`${geo}-lines`,'visibility','visible');
  }
}

// Combo methods for setting the paint features for each layer
// setFillPaint() and setExtrusionPaint() need the values and colors from the updatePaint() method
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

// Line color is unique for hover or held areas, otherwise it is black
const setLineColor = () => {
  // get the custom colors if they exist
  let c1 = customColors[5] ? customColors[5] : "#e72cdc";
  let c2 = customColors[6] ? customColors[6] : "#32cc32";
  map.setPaintProperty(`${SETTINGS['Geo']}-lines`,'line-color',
    ['case',
    ['boolean', ['feature-state', 'hold'], false], c1,
    ['boolean', ['feature-state', 'hover'], false], c2, 'black',
  ]);
}
// Only have line width if the area is hovered, held, or has a flag (and flag mode on)
const setLineWidth = () => {
  map.setPaintProperty(`${SETTINGS['Geo']}-lines`,'line-width',
    ['case',
    ['boolean', ['feature-state', 'hold'], false], 6,
    ['boolean', ['feature-state', 'hover'], false], 4,
    ['boolean', ['feature-state', 'flag'], false], 1, 0,
  ]);
}
// Only have line opacity if the area is hovered, held, or has a flag (and flag mode on)
const setLineOpacity = () => {
  map.setPaintProperty(`${SETTINGS['Geo']}-lines`,'line-opacity',
    ['case',
    ['boolean', ['feature-state', 'hold'], false], 1,
    ['boolean', ['feature-state', 'hover'], false], 1,
    ['boolean', ['feature-state', 'flag'], false], 1, 0.05,
  ]);
}

// see filters.js
const setFillOpacity = () => {
  resetFilter()
}

// Set fill-color based on values and colors from updatePaint()
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

// Set extrusion-color based on values and colors from updatePaint()
// Hovered or held areas get a unique extrusion color, can be customized by user
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
// Set 3D height based on user settings
const setExtrusionHeight = arr => {
  map.setPaintProperty(`${SETTINGS['Geo']}-3d`, 'fill-extrusion-height',
    ['interpolate',
    ['linear'], ['feature-state', SETTINGS['Variable']],
    arr[0], 0.5, // Important! make sure base height is >0
    arr[4], parseFloat(SETTINGS['Height'])
  ]);
}

// Set extrusiont opacity based on user expression (cannot be a data expression 😡 )
const setExtrusionOpacity = () => {
  map.setPaintProperty(`${SETTINGS['Geo']}-3d`, 'fill-extrusion-opacity', SETTINGS['TileOpacity']);
}

const setNativeLandPaint = () => {
  map.setLayoutProperty('nativelands','visibility','visible');
  map.setPaintProperty('nativelands', 'fill-color', [
        "rgb",
          ["get", "r1"],
          ["get", "r2"],
          ["get", "r3"]
    ]);
}
