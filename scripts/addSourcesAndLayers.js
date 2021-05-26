function addSources(){
  Object.keys(SOURCE_TILESET_ID).forEach(function(geo){
    map.addSource(geo, {
      'type': 'vector',
      'url': SOURCE_TILESET_ID[geo],
      'promoteId': 'GEOID10',
      //nativelands layer has no GEOID, so it must use // 'generateId': true
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
          ['boolean', ['feature-state', 'hover'], false], 'black', 'black',
        ],
        'line-width': [
          'case',
          ['boolean', ['feature-state', 'hold'], false], 5,
          ['boolean', ['feature-state', 'hover'], false], 3, 0.5,
        ],
        'line-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false], 1,
          ['boolean', ['feature-state', 'hold'], false], 1, 0.05,
        ],
      },
  });
}

function addFillAndLineLayers(){
  Object.keys(LAYER_DICT).forEach(function(geo){
    addFillLayer(geo)
    addLineLayer(geo)
  })
}
