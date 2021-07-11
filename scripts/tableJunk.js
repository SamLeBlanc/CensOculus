const updateMoveTable = (e, geoid) => {
  let variable = SETTINGS['Variable'];
  let geo = SETTINGS['Geo']
  let geoidFeatureStates = map.getFeatureState({ source: SOURCE_DICT[geo], sourceLayer: SOURCELAYER_DICT[geo], id: geoid });

  $('#m-name').text(e.features[0].properties.NAME10)
  $('#m-val').text(formatNumber(geoidFeatureStates[variable]))
  $('#m-var').text(nickname(variable))
  updateMove2()


}

const updateMove2 = () => {
  if(!tack) {
    $('#move2').css({left:event.pageX+10, top:event.pageY+10}).css('transition','0s');
  }
  let offset = 0;
  if (Object.keys(heldDistricts).length > 0) offset = $('#mySidebar0').width() + 30;
  let le = window.innerWidth - offset - $('#move2').width() - 30;
  if(tack) $('#move2').css({left:le, top:10}).css('transition','0.3s');
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

const heldData2TableARRAY = heldData => {
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

function createVariableDropdownSelect(id,list) {
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
