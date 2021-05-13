function loadDataFromCSV(concept){
  console.log('Loading data, please wait...')
  d3.csv(`${concept}.csv`).then(function(data) {
    keys = Object.keys(data[0])
    data.forEach(function(d) {
      keys.forEach(function(k) { if (k != 'GEOID10' && k != 'SIZE') d[k] = +d[k] })
    });
    LORAX[concept] = data.filter(function(d){ return true })
    console.log(`${concept} loaded`)
    update()
  });
  // d3.csv("P2.csv").then(function(data) {
  //   keys = Object.keys(data[0])
  //   data.forEach(function(d) {
  //     keys.forEach(function(k) { if (k != 'GEOID10' && k != 'SIZE') d[k] = +d[k] })
  //   });
  //   P2 = data.filter(function(d){ return true })
  //   console.log('P2 loaded')
  // });
  // d3.csv("P3.csv").then(function(data) {
  //   keys = Object.keys(data[0])
  //   data.forEach(function(d) {
  //     keys.forEach(function(k) { if (k != 'GEOID10' && k != 'SIZE') d[k] = +d[k] })
  //   });
  //   P3 = data.filter(function(d){ return true })
  //   console.log('P3 loaded')
  // });
  // d3.csv("P4.csv").then(function(data) {
  //   keys = Object.keys(data[0])
  //   data.forEach(function(d) {
  //     keys.forEach(function(k) { if (k != 'GEOID10' && k != 'SIZE') d[k] = +d[k] })
  //   });
  //   P4 = data.filter(function(d){ return true })
  //   console.log('P4 loaded')
  // });
  // d3.csv("P5.csv").then(function(data) {
  //   keys = Object.keys(data[0])
  //   data.forEach(function(d) {
  //     keys.forEach(function(k) { if (k != 'GEOID10' && k != 'SIZE') d[k] = +d[k] })
  //   });
  //   P5 = data.filter(function(d){ return true })
  //   console.log('P5 loaded')
  // });
  // d3.csv("P6.csv").then(function(data) {
  //   keys = Object.keys(data[0])
  //   data.forEach(function(d) {
  //     keys.forEach(function(k) { if (k != 'GEOID10' && k != 'SIZE') d[k] = +d[k] })
  //   });
  //   P6 = data.filter(function(d){ return true })
  //   console.log('P6 loaded')
  // });
  // d3.csv("P7.csv").then(function(data) {
  //   keys = Object.keys(data[0])
  //   data.forEach(function(d) {
  //     keys.forEach(function(k) { if (k != 'GEOID10' && k != 'SIZE') d[k] = +d[k] })
  //   });
  //   P7 = data.filter(function(d){ return true })
  //   console.log('P7 loaded')
  // });
  // d3.csv("P8.csv").then(function(data) {
  //   keys = Object.keys(data[0])
  //   data.forEach(function(d) {
  //     keys.forEach(function(k) { if (k != 'GEOID10' && k != 'SIZE') d[k] = +d[k] })
  //   });
  //   P8 = data.filter(function(d){ return true })
  //   console.log('P8 loaded')
  // });
  // d3.csv("P9.csv").then(function(data) {
  //   keys = Object.keys(data[0])
  //   data.forEach(function(d) {
  //     keys.forEach(function(k) { if (k != 'GEOID10' && k != 'SIZE') d[k] = +d[k] })
  //   });
  //   P9 = data.filter(function(d){ return true })
  //   console.log('P9 loaded')
  // });
  // d3.csv("P10.csv").then(function(data) {
  //   keys = Object.keys(data[0])
  //   data.forEach(function(d) {
  //     keys.forEach(function(k) { if (k != 'GEOID10' && k != 'SIZE') d[k] = +d[k] })
  //   });
  //   P10 = data.filter(function(d){ return true })
  //   console.log('P10 loaded')
  // });
}
