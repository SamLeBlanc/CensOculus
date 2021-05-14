function addSources(){
  Object.keys(SOURCE_TILESET_ID).forEach(function(key){
    map.addSource(key, {
      'type': 'vector',
      'url': SOURCE_TILESET_ID[key],
      'promoteId': 'GEOID10',
      //nativelands layer has no GEOID, so it must use generateId: true
    })
  });
}
function addFillAndLineLayers(){
  Object.keys(LAYER_DICT).forEach(function(key){
    map.addLayer({
      'id': LAYER_DICT[key],
      'type': 'fill',
      'source': SOURCE_DICT[key],
      'source-layer': SOURCELAYER_DICT[key],
      'layout': {'visibility': 'visible'},
      'paint': {
        'fill-color': "rgba(255, 255, 255, 0)",
        'fill-opacity' : 0,
      },
    });
    map.addLayer({
      'id': LINELAYER_DICT[key],
      'type': 'line',
      'source': SOURCE_DICT[key],
      'source-layer': SOURCELAYER_DICT[key],
      'layout': {'visibility': 'none'},
      'paint': {
          'line-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false], 'purple', 'black',
          ],
          'line-width': [
            'case',
            ['boolean', ['feature-state', 'hover'], false], 3, 0.5,
          ],
          'line-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false], 1, 0.05,
          ],
        },
    });
  })
}
