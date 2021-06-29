// Reverses the order of the current color scheme
function reverseColorScale(){
  let scheme = $('#color-select').find(":selected").val();
  COLOR_DICT[scheme] = COLOR_DICT[scheme].reverse();
  update();
}

function colorLinear(){
  let fiveStep = {};
  if (customRanges["linearMin"] != null) {
    fiveStep[0] = customRanges["linearMin"];
    fiveStep[4] = customRanges["linearMax"];
  } else {
    fiveStep[0] = QSummary[0];
    fiveStep[4] = QSummary[1];
  }
  let range = fiveStep[4] - fiveStep[0];
  fiveStep[1] = fiveStep[0] + range*0.25;
  fiveStep[2] = fiveStep[0] + range*0.5;
  fiveStep[3] = fiveStep[0] + range*0.75;
  return fiveStep
}

function colorQuantile(){
  let fiveStep = {};
  if (customRanges["quantileQ0"] != null) {
    fiveStep[0] = customRanges["quantileQ0"];
    fiveStep[1] = customRanges["quantileQ1"];
    fiveStep[2] = customRanges["quantileQ2"];
    fiveStep[3] = customRanges["quantileQ3"];
    fiveStep[4] = customRanges["quantileQ4"];
  } else {
    fiveStep[0] = QSummary[0];
    fiveStep[1] = QSummary[0.25];
    fiveStep[2] = QSummary[0.5];
    fiveStep[3] = QSummary[0.75];
    fiveStep[4] = QSummary[1];
  }
  return fiveStep
}

function adjustment(arr){
  for (i=0; i < arr.length; i++){
    arr[i] += ((i-2) * .0000001)
  }
  return arr
}

function getCustomColors(colors){
  customColors.forEach((element, i) => {
    if (element != null) colors[i] = customColors[i]
  });
  return colors
}

function getOutlineColors(){
  hoverColor = $(`#cpick-5`).val()
  heldColor = $(`#cpick-6`).val()
  console.log(hoverColor, heldColor)
}

function colorLayer(){
  console.log('coloring')
  var scale = $('#scale-select').find(":selected").val();
  var scheme = $('#color-select').find(":selected").val();

  var colors = COLOR_DICT[scheme]

  if (scale == "Linear") fiveStep = colorLinear();
  else if (scale == "Quantile") fiveStep = colorQuantile();

  arr = Object.values(fiveStep).sort((a, b) => a - b);

  colors = getCustomColors(colors)
  getOutlineColors()
  updateLegend(arr, colors)
  arr = adjustment(arr)
  setFillPaint(arr, colors)
  set3DPaint(arr, colors)
}


function updateLegend(arr, colors){
  var scheme = $('#color-select').find(":selected").val();
  var colors = COLOR_DICT[scheme]

  $(`#leg-square-5`).css("border", `solid 5px ${customColors[5]}`)
  $(`#leg-square-6`).css("border", `solid 5px ${customColors[6]}`)
  for (i = 0; i < 5; i++){
    if (colors[i].includes('#')){
      var col = hexToRgb(colors[i])
      colors[i] = `rgba(${col.r}, ${col.g}, ${col.b}, 1)`
    }
    $(`#leg-square-${i}`).css("background", colors[i])
    $(`#leg-label-${i}`).text(formatNumber(Math.max(arr[i],0)))
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
