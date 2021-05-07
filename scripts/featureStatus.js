function setFeatStates(variable){
  geo = $('#geo-select').find(":selected").val();
  if (variable.startsWith("H011") || variable.startsWith("PCT")){
    doot = DATA1.filter(function(d){ return d["SIZE"] == geo.toUpperCase() })
  } else {
    doot = DATA.filter(function(d){ return d["SIZE"] == geo.toUpperCase() })
  }
  doot.forEach(function(d){
    n = {}
    if (variable.endsWith("P")){
      v = variable.slice(0,-1)
      n[variable] = d[v] / (1 + d[PERCENT_DICT[v]])
    } else {
      n[variable] = d[variable]
    }
    map.setFeatureState({ source: 'nation', sourceLayer: '00US_nation10-19oe1f', id: d.GEOID10 }, n );
    map.setFeatureState({ source: 'states', sourceLayer: '00US_states10-dyd7cv', id: d.GEOID10 }, n );
    map.setFeatureState({ source: 'counties', sourceLayer: '00US_countys10-06iixg', id: d.GEOID10 }, n );
    map.setFeatureState({ source: 'tracts', sourceLayer: '00US_tracts101-47boqk', id: d.GEOID10 }, n );
    map.setFeatureState({ source: 'metroSA', sourceLayer: '00US_metroSA10-3ga0t5', id: d.GEOID10 }, n );
    map.setFeatureState({ source: 'urban', sourceLayer: '00US_urban10-ayziii', id: d.GEOID10 }, n );
    map.setFeatureState({ source: 'zip', sourceLayer: '00US_zip10-cz976w', id: d.GEOID10 }, n );
    if (geo == 'group'){
      map.setFeatureState({ source: 'groups', sourceLayer: '00US_groups101-5zqy3o', id: d.GEOID10 }, n );
    }
  });
}

function featureRandomColor(s, sL){
  DATA.forEach(function(d){
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    map.setFeatureState({ source: s, sourceLayer: sL, id: d.GEOID10 },
      {
        rand_color: `#${randomColor}`
      });
    });
  }

  function hideAllLayers(){
    L = Object.keys(SOURCE_DICT)
    for(i = 1; i < L.length; i++){
      map.setLayoutProperty(L[i].concat('-fills'),'visibility','none')
      map.setLayoutProperty(L[i].concat('-lines'),'visibility','none')
    }
  }
