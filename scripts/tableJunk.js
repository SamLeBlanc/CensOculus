function addMoveTable(arr) {
  if ($("#move-table")){
    $("#move-table").remove();
  }
  var myTableDiv = document.getElementById("move")
  var table = document.createElement('TABLE')
  var tableBody = document.createElement('TBODY')
  table.id = 'move-table'
  table.className = 'tableA'
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

function createMoveTableArray(s,geoid,obj){
  var arr = [];
  arr.push([geoid,""])
  for (i = 0; i < s.length; i++){
    var num = obj[s[i]];
    num = formatNumber(num)
    n = NICKNAMES[s[i]] ? NICKNAMES[s[i]] : s[i]
    arr.push([n,num]);
  }
  return arr
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
