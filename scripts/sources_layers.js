// Methods for loading Mapbox vector sources and layers
// There are 3 types of vector layers: line, fill, and extrusion
// All layers are added on the initial page load (although I may chage this later for the sake of speed)

const addFillLineExtrusionLayers = () => {
  Object.keys(LAYER_DICT).forEach(geo => {
    addLineLayer(geo)
    addFillLayer(geo)
    addExtrusionLayer(geo)
  });
}

const addSources = () => {
  Object.keys(SOURCE_TILESET_ID).forEach(geo => {
    map.addSource(geo, {
      'type': 'vector',
      'url': SOURCE_TILESET_ID[geo],
      'promoteId': 'GEOID10',
      // nativelands layer has no pre-set GEOID, use 'generateId': true instead of 'promoteId'
    })
  });
}

const addLineLayer = geo => {
  map.addLayer({
    'id': LINELAYER_DICT[geo],
    'type': 'line',
    'source': SOURCE_DICT[geo],
    'source-layer': SOURCELAYER_DICT[geo],
    'layout': {'visibility': 'none'},
    'paint': {'line-opacity' : 0 },
  });
}

const addFillLayer = geo => {
  map.addLayer({
    'id': LAYER_DICT[geo],
    'type': 'fill',
    'source': SOURCE_DICT[geo],
    'source-layer': SOURCELAYER_DICT[geo],
    'layout': {'visibility': 'none'},
    'paint': { 'fill-opacity' : 0 },
  });
}

const addExtrusionLayer = geo => {
  map.addLayer({
    'id': EXTRUDELAYER_DICT[geo],
    'type': 'fill-extrusion',
    'source': SOURCE_DICT[geo],
    'source-layer': SOURCELAYER_DICT[geo],
    'layout': {'visibility': 'none'},
    'paint': {
      'fill-extrusion-opacity': 0,
      'fill-extrusion-height': 0,
      'fill-extrusion-base': 0,
      }
    });
}
