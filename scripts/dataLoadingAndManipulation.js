function loadDataFromCSV(concept){
  console.log('Loading data, please wait...')
  console.log(concept)
  d3.csv(`${concept}.csv`).then(function(data) {
    keys = Object.keys(data[0])
    data.forEach(function(d) {
      keys.forEach(function(k) {
        if (k != 'GEOID10' && k != 'SIZE') d[k] = +d[k]
      })
    });
    LORAX[concept] = data.filter(function(d){ return true })
    console.log(`${concept} loaded`)
    update()
  });
}

function variableListByConcept(concept){
  d3.csv(`2010Variables.csv`).then(function(data) {
    V = data.filter(function(d){ return true })
        A = []
    V = V.map(function(d) {
      return {
        Name: d.Name,
        Group: d.Group
      }
    }).filter(function(d){ return d["Group"] == concept }).forEach(function(d){ A.push(d.Name)});
        console.log(A)
      });
}
