// Methods having to do with tables or other stupid things
// A bunch of gobbldy gook that I do not want to real with right now

const updateMoveTable = (e, geoid) => {
  let variable = SETTINGS['Variable'];
  let geo = SETTINGS['Geo']
  let geoidFeatureStates = map.getFeatureState({ source: SOURCE_DICT[geo], sourceLayer: SOURCELAYER_DICT[geo], id: geoid });
  console.log('hete')
  $('#m-name').text(e.features[0].properties.NAME10)
  $('#m-val').text(formatNumber(geoidFeatureStates[variable]))

  const nickname = v => {
    if (NICKNAMES[v]) return NICKNAMES[v];
    if (NICKNAMES[v.slice(0, -1)]) return NICKNAMES[v.slice(0, -1)];
    return v
  }
  $('#m-var').text(nickname(variable))
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

function addheldTable(arr) {
  if ($("#held-table")){
    $("#held-table").remove();
  }
  var myTableDiv = document.getElementById("held-data")
  var table = document.createElement('TABLE')
  var tableBody = document.createElement('TBODY')
  table.id = 'held-table'
  table.className = 'tableC'
  table.appendChild(tableBody);

  for (i = 0; i < arr.length; i++) {
    var tr = document.createElement('TR');
    for (j = 0; j < arr[i].length; j++) {
      var td = document.createElement('TD')
      td.appendChild(document.createTextNode(arr[i][j]));
      tr.appendChild(td)
    }
    tableBody.appendChild(tr);
  }
  myTableDiv.appendChild(table)
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

function createVariableDropdownSelect(list) {
  for (qq = 0; qq < 3; qq++) {
    let id = `variable-select-${qq}`
    var x = document.getElementById(id);
    var length = x.length;
    for (i = length-1; i >= 0; i--) {
      x.options[i] = null;
    }
    for (const item of list) {
      var z = document.createElement("option");
      z.setAttribute("value", item);
      var tag = `${item} - ${TAG[item]}`
      var t = document.createTextNode(tag);
      z.appendChild(t);
      x.appendChild(z);
      var z = document.createElement("option");
      z.setAttribute("value", `${item}P`);
      var tag = `${item}P - ${TAG[item.concat("P")]}`
      var t = document.createTextNode(tag);
      z.appendChild(t);
      x.appendChild(z);
    }
  }
}
