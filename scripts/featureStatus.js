function setFeatStates(variable){
  geo = $('#geo-select').find(":selected").val();
  concept = $('#concept-select').find(":selected").val();
  data = LORAX[concept]
  .filter(function(d){ return d["SIZE"] == geo.toUpperCase() })
  .forEach(function(d){
    n = {};
    if (variable.endsWith("P")){
      v = variable.slice(0,-1);
      n[variable] = d[v] / (1 + d[v.slice(0,4).concat("001")]);
    } else {
      n[variable] = d[variable];
    }
    map.setFeatureState({ source: SOURCE_DICT[geo], sourceLayer: SOURCELAYER_DICT[geo], id: d.GEOID10 }, n );
  })
}

function featureRandomColor(s, sL){
  DATA.forEach(function(d){
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    map.setFeatureState({ source: s, sourceLayer: sL, id: d.GEOID10 }, { rand_color: `#${randomColor}` });
    });
  }

function hideAllLayers(){
  L = Object.keys(SOURCE_DICT)
  for(i = 1; i < L.length; i++){
    map.setLayoutProperty(L[i].concat('-fills'),'visibility','none')
    map.setLayoutProperty(L[i].concat('-lines'),'visibility','none')
  }
}
