//// Methods pertaining to the Legend

// Setup initial position of the legend
const legendSetup = () => {
  let h = parseInt($('#legend').css("height").slice(0,-2));
  $('#drag-1').css('top', `${window.innerHeight - h - 35}px`);
  let w = parseInt($('#legend').css("width").slice(0,-2));
  let w_ = Math.max(window.innerWidth - w - 320, 390);
  $('#drag-1').css('left', `500px`);
}

// Update the legend to have the appropriate colors and labels showing
// Must have 'arr' (the numerical color stop values) and 'colors' (the actual color list) from updatePaint()
const updateLegend = (arr, colors) => {
  customOutlineColors();
  colors = convertColors(colors)
  for (i = 0; i < 5; i++){
    $(`#leg-square-${i}`).css("background", colors[i])
    let val = adjustMinMaxValue(arr, i)
    let n = formatLegendLabel(val, i)
    $(`#leg-label-${i}`).text(n)
  }
}

// Convert the colors from hex to rgb (idk why Mapbox isn't accepting hex, but oh well)
const convertColors = colors => {
  for (i = 0; i < 5; i++){
    if (colors[i].includes('#')){
      let col = hexToRgb(colors[i])
      colors[i] = `rgba(${col.r}, ${col.g}, ${col.b}, 1)`
    }
  }
  return colors
}

// Readjust Min and Max values back to true value for the purpose of labeling
// Currently, the color scheme uses the 1st and 99th percentile for actual coloring
const adjustMinMaxValue = (arr, i) => {
  if (customRanges["linearMin"] == null && customRanges["quartileQ0"] == null){
    if (i == 0) return QSummary[0];
    if (i == 4) return QSummary[1000];
  }
  return arr[i]
}

// Format the Label in the Legend to have proper number format
const formatLegendLabel = (val,i) => {
  if (SETTINGS["Variable"].endsWith("P")) {
    n = formatPercent(val);
  } else if (SETTINGS["Variable"].endsWith("D")) {
    n = formatDensity(val);
  } else {
    n = abbreviateNumber(val);
  }
  return n
}

// Display custom hover/hold outline colors in legend
const customOutlineColors = () => {
  $(`#leg-square-5`).css("border", `solid 5px ${customColors[5]}`);
  $(`#leg-square-6`).css("border", `solid 5px ${customColors[6]}`);
}

// Convert hex color to object with RGB color values
const hexToRgb = hex => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
