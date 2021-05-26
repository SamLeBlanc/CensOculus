function loadDataFromCSV(concept){
  d3.csv(`data/2010/${concept}.csv`).then(function(data) {
    keys = Object.keys(data[0])
    data.forEach(function(d) {
      keys.forEach(function(k) {
        if (k != 'GEOID10' && k != 'SIZE') d[k] = +d[k]
      })
    });
    LORAX[concept] = data.filter(function(d){ return true })
  });
}

function getVariableListByConcept(concept){
  d3.csv(`data/2010/Variables_10.csv`).then(function(data) {
    D = data.filter(function(d){ return d["Group"] == concept })
  }).then(function() {
    VLbC[concept] = [];
    D.forEach(function(d) {
      VLbC[concept].push(d.Name)
    })
  })
}


function getVariableLabelList(){
  d3.csv(`data/2010/Variables_10.csv`).then(function(data) {
    data.forEach((d) => {
      TAG[d.Name] = d.Label
      .replace("Total!!","")
      .replace("Total races tallied!!","")
      TAG[(d.Name).concat("P")] = ("[%] ")
      .concat(d.Label
        .replace("Total!!","")
        .replace("Total races tallied!!","")
      )
    })
  }).then(function(){
    updateConcept()
  })
}
