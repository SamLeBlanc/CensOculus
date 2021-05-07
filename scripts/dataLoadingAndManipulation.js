function loadDataFromCSV(){
  console.log('Loading data, please wait...')
  d3.csv("full3.csv").then(function(data) {
    keys = Object.keys(data[0])
    data.forEach(function(d) {
      keys.forEach(function(k) { if (k != 'GEOID10' && k != 'SIZE') d[k] = +d[k] })
    });
    DATA = data.filter(function(d){ return true })
    console.log('DATA loaded')
  });
  d3.csv("full4.csv").then(function(data) {
    keys = Object.keys(data[0])
    data.forEach(function(d) {
      keys.forEach(function(k) { if (k != 'GEOID10' && k != 'SIZE') d[k] = +d[k] })
    });
    DATA1 = data.filter(function(d){ return true })
    console.log('DATA1 loaded')
  });
}
