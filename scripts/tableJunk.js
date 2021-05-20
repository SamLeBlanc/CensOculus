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

function createMoveTableArray(s,geoid,obj){
  var arr = [];
  arr.push([geoid,""])
  for (i = 0; i < s.length; i++){
    var num = obj[s[i]];
    num = formatNumber(num)
    arr.push([s[i],num]);
  }
  return arr
}
