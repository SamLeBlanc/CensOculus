function loadDataFromCSV(){
  console.log('Loading data, please wait...')
  d3.csv("full3.csv").then(function(data) {
    keys = Object.keys(data[0])
    data.forEach(function(d) {
      keys.forEach(function(k) { if (k != 'GEOID10' && k != 'SIZE') d[k] = +d[k] })
    });
    DATA = data.filter(function(d){ return true })
    console.log('Data loaded')
  });
}

function countyFilter(d){
  return d.GEOID10.length == 5
}

function tractFilter(d){
  return d.GEOID10.length == 11
}

function groupFilter(d){
  return d.GEOID10.length == 12
}

function stateFilter(d,code){
  return d.GEOID10.slice(0,2) == code
}
