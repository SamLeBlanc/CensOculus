//// Methods for loading Mapbox vector sources and layers
// There are 3 types of vector layers: line, fill, and extrusion (3D)
// All layers are added on the initial page load (although I may change this later for the sake of speed)

// Add Mapbox sources
const addSources = () => {
  Object.keys(SOURCE_TILESET_ID).forEach(geo => {
    map.addSource(geo, {
      'type': 'vector',
      'url': SOURCE_TILESET_ID[geo],
      'promoteId': 'GEOID10', // important!
    })
  });
}

// Combo: For each source, add the fill, line and extrusion layer
const addFillLineExtrusionLayers = () => {
  Object.keys(SOURCE_DICT).forEach(geo => {
    addFillLayer(geo)
    addExtrusionLayer(geo)
    addLineLayer(geo)
  });
}
// Initially set all visibility to none AND have zero opacity (these are seperate and important)
const addLineLayer = geo => {
  map.addLayer({
    'id': `${geo}-lines`,
    'type': 'line',
    'source': SOURCE_DICT[geo],
    'source-layer': SOURCELAYER_DICT[geo],
    'layout': {'visibility': 'none'},
    'paint': {'line-opacity' : 0 },
  });
}
const addFillLayer = geo => {
  map.addLayer({
    'id': `${geo}-fills`,
    'type': 'fill',
    'source': SOURCE_DICT[geo],
    'source-layer': SOURCELAYER_DICT[geo],
    'layout': {'visibility': 'none'},
    'paint': { 'fill-opacity' : 0 },
  });
}
const addExtrusionLayer = geo => {
  map.addLayer({
    'id': `${geo}-3d`,
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

// Add the source and layer for the Native Land Acknowledgement
const addNativeLandsLayer = () => {
  map.addSource('nativelands', {
    'type': 'vector',
    'url': `mapbox://samleblanc.11o9pqbw`,
    'generateId': true
  })
  map.addLayer({
    'id': 'nativelands',
    'type': 'fill',
    'source': 'nativelands',
    'source-layer': 'indigenousNA-b3bdp4',
    'layout': {'visibility': 'none'},
    'paint' : {'fill-opacity' : 0.3},

  });
}
