function colorLayer(layer_name, variable, quants){
  var scale = $('#scale-select').find(":selected").val();
  colors = updateLegend()
  if (JSON.stringify(LINEAR_RANGE)==JSON.stringify([-69.42,69.42])){
    var min = quants[0];
    var max = quants[4];
  } else {
    var min = LINEAR_RANGE[0];
    var max = LINEAR_RANGE[1];
  }
  var range = max - min;
  if (scale == 'Linear' || scale == 'Custom Linear'){
    var arr = [min, min+range*0.25, min+range*0.5, min+range*0.75, max];
  } else {
    var arr = quants;
  }
  for (i=0; i < arr.length; i++){
    arr[i] += ((i-2) * .00001)
  }
  setTimeout(function(){
    for (i=0; i<5; i++){
      var n = Math.max(arr[i],0)
      $("#leg-label-".concat(i)).text(formatNumber(n))
    }
    map.setPaintProperty(layer_name, 'fill-color', ['case',
      ['!=', ['feature-state', variable], null],
      ['interpolate',
      ['linear'], ['feature-state', variable],
      arr[0], colors[0],
      arr[1], colors[1],
      arr[2], colors[2],
      arr[3], colors[3],
      arr[4], colors[4]
    ],
    'rgba(255, 0, 255, 0)'
    ]);
    map.setPaintProperty(layer_name, 'fill-opacity', 0.7)
  },100 );
}

function updateLegend(){
  var scheme = $('#color-select').find(":selected").val();
  var colors = COLOR_DICT[scheme]

  customColors.forEach((element, i) => {
    if (element != null) colors[i] = customColors[i]
  });

  for (i=0; i<5; i++){
    if (colors[i].includes('#')){
      var c1 = hexToRgb(colors[i])
      colors[i] = `rgba(${c1.r}, ${c1.g}, ${c1.b}, 1)`
    }
    $("#leg-square-".concat(i)).css("background", colors[i])
  }
  return colors
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
