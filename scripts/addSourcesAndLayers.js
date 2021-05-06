function addSources(){
  map.addSource('nativelands', {
    'type': 'vector',
    'url': 'mapbox://samleblanc.11o9pqbw',
    'generateId': true,
  });
  map.addSource('nation', {
    'type': 'vector',
    'url': 'mapbox://samleblanc.5uf5jtni',
    'promoteId': 'GEOID10',
  });
  map.addSource('states', {
    'type': 'vector',
    'url': 'mapbox://samleblanc.0p3v7xb5',
    'promoteId': 'GEOID10',
  });
  map.addSource('counties', {
    'type': 'vector',
    'url': 'mapbox://samleblanc.crr5vjia',
    'promoteId': 'GEOID10',
  });
  map.addSource('groups', {
    'type': 'vector',
    'url': 'mapbox://samleblanc.6hr5or7z',
    'promoteId': 'GEOID10',
  });
  map.addSource('tracts', {
    'type': 'vector',
    'url': 'mapbox://samleblanc.9kelmyl5',
    'promoteId': 'GEOID10',
  });
  map.addSource('metroSA', {
    'type': 'vector',
    'url': 'mapbox://samleblanc.4vq76ly3',
    'promoteId': 'GEOID10',
  });
  map.addSource('urban', {
    'type': 'vector',
    'url': 'mapbox://samleblanc.a42xhen2',
    'promoteId': 'GEOID10',
  });
  map.addSource('zip', {
    'type': 'vector',
    'url': 'mapbox://samleblanc.ai39xu4d',
    'promoteId': 'GEOID10',
  });

}
function addNativelandLayers(){
  map.addLayer({
    'id': 'nativeland-fills',
    'type': 'fill',
    'source': 'nativelands',
    'source-layer': 'indigenousNA-b3bdp4',
    'layout': {'visibility': 'visible'},
    'paint': {
      'fill-color': ["get", "color"],
      'fill-opacity' : 0,
    },
  });
  map.addLayer({
    'id': 'nativeland-lines',
    'type': 'line',
    'source': 'nativelands',
    'source-layer': 'indigenousNA-b3bdp4',
    'layout': {'visibility': 'none'},
    'paint': {
      'line-color': 'black',
      'line-width': 1,
      'line-opacity': .5,
    }
  });
}
function addNationLayers(){
  map.addLayer({
    'id': 'nation-fills',
    'type': 'fill',
    'source': 'nation',
    'source-layer': '00US_nation10-19oe1f',
    'layout': {'visibility': 'none'},
    'paint': {
        'fill-opacity': 0.7,
        'fill-color':
        ['case',
          ['!=', ['feature-state', 'P006003P'], null],
          ['interpolate',
          ['linear'], ['feature-state', 'P006003P'],
            0, '#f9e721',
            0.25, '#5ac865',
            0.5, '#21908d',
            0.75, '#3b1c8c',
            1, '#450256'
        ],
          'rgba(255, 255, 255, 0)'
        ]
      }
  });
  map.addLayer({
    'id': 'nation-lines',
    'type': 'line',
    'source': 'nation',
    'source-layer': '00US_nation10-19oe1f',
    'layout': {'visibility': 'visible'},
    'paint': {
      'line-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 'purple', 'black',
      ],
      'line-width': [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 3, 0,
      ],
      'line-opacity': 1,
    }
  });
}
function addStateLayers(){
  map.addLayer({
    'id': 'state-fills',
    'type': 'fill',
    'source': 'states',
    'source-layer': '00US_states10-dyd7cv',
    'layout': {'visibility': 'none'},
    'paint': {
        'fill-opacity': 0.7,
        'fill-color':
        ['case',
          ['!=', ['feature-state', 'P006003P'], null],
          ['interpolate',
          ['linear'], ['feature-state', 'P006003P'],
            0, '#f9e721',
            0.25, '#5ac865',
            0.5, '#21908d',
            0.75, '#3b1c8c',
            1, '#450256'
        ],
          'rgba(255, 255, 255, 0)'
        ]
      }
  });
  map.addLayer({
    'id': 'state-lines',
    'type': 'line',
    'source': 'states',
    'source-layer': '00US_states10-dyd7cv',
    'layout': {'visibility': 'visible'},
    'paint': {
      'line-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 'purple', 'black',
      ],
      'line-width': [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 3, 0,
      ],
      'line-opacity': 1,
    }
  });
}
function addCountyLayers(){
  map.addLayer({
    'id': 'county-fills',
    'type': 'fill',
    'source': 'counties',
    'source-layer': '00US_countys10-06iixg',
    'layout': {'visibility': 'none'},
    'paint': {
        'fill-opacity': 0.7,
        'fill-color':
        ['case',
          ['!=', ['feature-state', 'P006003P'], null],
          ['interpolate',
          ['linear'], ['feature-state', 'P006003P'],
            0, '#f9e721',
            0.25, '#5ac865',
            0.5, '#21908d',
            0.75, '#3b1c8c',
            1, '#450256'
        ],
          'rgba(255, 255, 255, 0)'
        ]
      }
  });
  map.addLayer({
    'id': 'county-lines',
    'type': 'line',
    'source': 'counties',
    'source-layer': '00US_countys10-06iixg',
    'layout': {'visibility': 'visible'},
    'paint': {
      'line-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 'purple', 'black',
      ],
      'line-width': [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 3, 0,
      ],
      'line-opacity': 1,
    }
  });
}
function addTractLayers(){
  map.addLayer({
    'id': 'tract-fills',
    'type': 'fill',
    'source': 'tracts',
    'source-layer': '00US_tracts101-47boqk',
    'layout': {'visibility': 'none'},
    'paint': {
        'fill-opacity': 0.7,
        'fill-color':
        ['case',
          ['!=', ['feature-state', 'P006003P'], null],
          ['interpolate',
          ['linear'], ['feature-state', 'P006003P'],
            0, '#f9e721',
            0.25, '#5ac865',
            0.5, '#21908d',
            0.75, '#3b1c8c',
            1, '#450256'
        ],
          'rgba(255, 255, 255, 0)'
        ]
      }
    });
  map.addLayer({
    'id': 'tract-lines',
    'type': 'line',
    'source': 'tracts',
    'source-layer': '00US_tracts101-47boqk',
    'layout': {'visibility': 'visible'},
    'paint': {
      'line-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 'purple', 'black',
      ],
      'line-width': [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 3, 0,
      ],
      'line-opacity': 1,
    }
  });
}
function addGroupLayers(){
  map.addLayer({
    'id': 'group-fills',
    'type': 'fill',
    'source': 'groups',
    'source-layer': '00US_groups101-5zqy3o',
    'layout': {'visibility': 'none'},
    'paint': {
        'fill-opacity': 0.7,
        'fill-color':
        ['case',
          ['!=', ['feature-state', 'P006003P'], null],
          ['interpolate',
          ['linear'], ['feature-state', 'P006003P'],
            0, '#f9e721',
            0.25, '#5ac865',
            0.5, '#21908d',
            0.75, '#3b1c8c',
            1, '#450256'
        ],
          'rgba(255, 255, 255, 0)'
        ]
      }
  });
  map.addLayer({
    'id': 'group-lines',
    'type': 'line',
    'source': 'groups',
    'source-layer': '00US_groups101-5zqy3o',
    'layout': {'visibility': 'visible'},
    'paint': {
      'line-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 'purple', 'black',
      ],
      'line-width': [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 3, 0,
      ],
      'line-opacity': 1,
    }
  });
}
function addMetroSALayers(){
  map.addLayer({
    'id': 'metroSA-fills',
    'type': 'fill',
    'source': 'metroSA',
    'source-layer': '00US_metroSA10-3ga0t5',
    'layout': {'visibility': 'none'},
    'paint': {
        'fill-opacity': 0.7,
        'fill-color':
        ['case',
          ['!=', ['feature-state', 'P006003P'], null],
          ['interpolate',
          ['linear'], ['feature-state', 'P006003P'],
            0, '#f9e721',
            0.25, '#5ac865',
            0.5, '#21908d',
            0.75, '#3b1c8c',
            1, '#450256'
        ],
          'rgba(255, 255, 255, 0)'
        ]
      }
  });
  map.addLayer({
    'id': 'metroSA-lines',
    'type': 'line',
    'source': 'metroSA',
    'source-layer': '00US_metroSA10-3ga0t5',
    'layout': {'visibility': 'visible'},
    'paint': {
      'line-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 'purple', 'black',
      ],
      'line-width': [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 3, 0,
      ],
      'line-opacity': 1,
    }
  });
}
function addUrbanLayers(){
  map.addLayer({
    'id': 'urban-fills',
    'type': 'fill',
    'source': 'urban',
    'source-layer': '00US_urban10-ayziii',
    'layout': {'visibility': 'none'},
    'paint': {
        'fill-opacity': 0.7,
        'fill-color':
        ['case',
          ['!=', ['feature-state', 'P006003P'], null],
          ['interpolate',
          ['linear'], ['feature-state', 'P006003P'],
            0, '#f9e721',
            0.25, '#5ac865',
            0.5, '#21908d',
            0.75, '#3b1c8c',
            1, '#450256'
        ],
          'rgba(255, 255, 255, 0)'
        ]
      }
  });
  map.addLayer({
    'id': 'urban-lines',
    'type': 'line',
    'source': 'urban',
    'source-layer': '00US_urban10-ayziii',
    'layout': {'visibility': 'visible'},
    'paint': {
      'line-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 'purple', 'black',
      ],
      'line-width': [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 3, 0,
      ],
      'line-opacity': 1,
    }
  });
}
function addZipLayers(){
  map.addLayer({
    'id': 'zip-fills',
    'type': 'fill',
    'source': 'zip',
    'source-layer': '00US_zip10-cz976w',
    'layout': {'visibility': 'none'},
    'paint': {
        'fill-opacity': 0.7,
        'fill-color':
        ['case',
          ['!=', ['feature-state', 'P006003P'], null],
          ['interpolate',
          ['linear'], ['feature-state', 'P006003P'],
            0, '#f9e721',
            0.25, '#5ac865',
            0.5, '#21908d',
            0.75, '#3b1c8c',
            1, '#450256'
        ],
          'rgba(255, 255, 255, 0)'
        ]
      }
  });
  map.addLayer({
    'id': 'zip-lines',
    'type': 'line',
    'source': 'zip',
    'source-layer': '00US_zip10-cz976w',
    'layout': {'visibility': 'visible'},
    'paint': {
      'line-color': [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 'purple', 'black',
      ],
      'line-width': [
        'case',
        ['boolean', ['feature-state', 'hover'], false], 3, 0,
      ],
      'line-opacity': 1,
    }
  });
}
