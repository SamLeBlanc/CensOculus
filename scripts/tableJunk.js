// Methods having to do with tables or other stupid things
// A bunch of gobbldy gook that I do not want to real with right now

const updateMoveTable = (e, geoid) => {
  let variable = SETTINGS['Variable'];
  let geo = SETTINGS['Geo'];
  let year = SETTINGS['Year']
  let geoidFeatureStates = map.getFeatureState({ source: SOURCE_DICT[geo], sourceLayer: SOURCELAYER_DICT[geo], id: geoid });
  try {
    let filtered = almanacFilter(year, geoid, geo)[0];
    $('#m-name').text(filtered[`NAME${year}`])
  } catch (error) {
    console.log(`almanacFilter failure: ${year, geoid, geo}`)
  }
  $('#m-val').text(formatNumber(geoidFeatureStates[variable]))
  $('#m-val').css('font-size','36px')
  if (variable.endsWith("D")) $('#m-val2').css(`font-size`,`24px`)
  else $('#m-val2').css(`font-size`,`0px;`)

  const nickname = v => {
    if (NICKNAMES[v]) return NICKNAMES[v];
    if (NICKNAMES[v.slice(0, -1)]) return NICKNAMES[v.slice(0, -1)];
    return v
  }
  $('#m-var').text(nickname(variable))
  $('#m-var').css('font-size','18px')
  updateMovingWindow()
}

const updateMovingWindow = () => {
  if(!tack) {
    $('#move-window').css({left:event.pageX+10, top:event.pageY+10}).css('transition','0s');
  } else {
    let offset = (Object.keys(heldDistricts).length > 0) ? $('#sidebar0').width() + 20 : 0;
    let le = window.innerWidth - offset - $('#move-window').width() - 30;
    $('#move-window').css({ left:le, top:10 });
  }
}

const addheldTable = arr => {
  if ($("#held-table")) $("#held-table").remove();
  let tableDiv = document.getElementById("held-data");
  let table = document.createElement('TABLE');
  let tableBody = document.createElement('TBODY');
  table.id = 'held-table';
  table.className = 'tableC';
  table.appendChild(tableBody);

  for (i = 0; i < arr.length; i++) {
    let tr = document.createElement('TR');
    for (j = 0; j < arr[i].length; j++) {
      let td = document.createElement('TD')
      td.appendChild(document.createTextNode(arr[i][j]));
      tr.appendChild(td)
    }
    tableBody.appendChild(tr);
  }
  tableDiv.appendChild(table)
}

const heldData2Array = heldData => {
  let arr = [];
  for (const v in heldData) {
    if (typeof heldData[v] == 'number'){
      n = heldData[v] / heldData[`${v.slice(0,4)}001`];
    }
    a = NICKNAMES[v] ? NICKNAMES[v] : null
    if (a && !['GEOID10','SIZE'].includes(v)) arr.push([a, numberWithCommas(heldData[v]), formatPercent(n)])
  }
  return arr
}

const createVariableDropdownSelect = async(list) => {
  try {
    for (qq = 0; qq < 3; qq++) {
      let div = document.getElementById(`variable-select-${qq}`);
      for (i = div.length - 1; i >= 0; i--) div.options[i] = null;
      for (const item of list) {
        optionShortcut(div, item, "")
        optionShortcut(div, item, "D")
        if (!item.endsWith("001")) optionShortcut(div, item, "P")
      }
    }
  } catch(error) {
    console.log(`createVariableDropdownSelect${error}`)
  }
}

const optionShortcut = (div, item, suffix) => {
  let z = document.createElement("option");
  z.setAttribute("value", `${item}${suffix}`);
  let tag = TAG[`${item}${suffix}`];
  let t = document.createTextNode(tag);
  z.appendChild(t);
  div.appendChild(z);
}
