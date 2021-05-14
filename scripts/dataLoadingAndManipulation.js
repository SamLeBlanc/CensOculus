function loadDataFromCSV(concept){
  console.log('Loading data, please wait...')
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
