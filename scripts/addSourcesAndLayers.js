// Methods for loading Mapbox vector sources and layers
// There are 3 types of vector layers: line, fill, and extrusion


function addSources(){
  Object.keys(SOURCE_TILESET_ID).forEach(geo => {
    map.addSource(geo, {
      'type': 'vector',
      'url': SOURCE_TILESET_ID[geo],
      'promoteId': 'GEOID10',
      // nativelands layer has no pre-set GEOID, use 'generateId': true instead of 'promoteId'
    })
  });
}

function addFillLayer(geo){
  map.addLayer({
    'id': LAYER_DICT[geo],
    'type': 'fill',
    'source': SOURCE_DICT[geo],
    'source-layer': SOURCELAYER_DICT[geo],
    'layout': {'visibility': 'visible'},
    'paint': {
      'fill-color': "rgba(255, 255, 255, 0)",
      'fill-opacity' : 0,
    },
  });
}

function addExtrusionLayer(geo){
  map.addLayer({
    'id': EXTRUDELAYER_DICT[geo],
    'type': 'fill-extrusion',
    'source': SOURCE_DICT[geo],
    'source-layer': SOURCELAYER_DICT[geo],
    'paint': {
      'fill-extrusion-opacity': 0,
      'fill-extrusion-height': 0,
      'fill-extrusion-base': 0,
      }
    });
}

function addLineLayer(geo){
  map.addLayer({
    'id': LINELAYER_DICT[geo],
    'type': 'line',
    'source': SOURCE_DICT[geo],
    'source-layer': SOURCELAYER_DICT[geo],
    'layout': {'visibility': 'none'},
    'paint': {
        'line-color': [
          'case',
          ['boolean', ['feature-state', 'hold'], false], 'rgb(231,44,220)',
          ['boolean', ['feature-state', 'hover'], false], 'yellow', 'black',
        ],
        'line-width': [
          'case',
          ['boolean', ['feature-state', 'hold'], false], 5,
          ['boolean', ['feature-state', 'hover'], false], 3,
          ['boolean', ['feature-state', 'flag'], false], 1, 0,
        ],
        'line-opacity': [
          'case',
          ['boolean', ['feature-state', 'hold'], false], 1,
          ['boolean', ['feature-state', 'hover'], false], 1,
          ['boolean', ['feature-state', 'flag'], false], 1, 0.05,
        ],
      },
  });
}

function addFillAndLineLayers(){
  Object.keys(LAYER_DICT).forEach(geo => {
    addFillLayer(geo)
    addLineLayer(geo)
    addExtrusionLayer(geo)
  })
}
