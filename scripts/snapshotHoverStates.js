function addTable3(arr) {
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

function formatNumber(num){
  variable = $('#variable-select').find(":selected").val();
  var num_format = $('#numformat-select').find(":selected").val();
  if (variable.endsWith("P")) num = formatPercent(num);
  else if (num_format == 'short') num = abbreviateNumber(num);
  else if (num_format == 'comma') num = numberWithCommas(num);
  return num
}

function hover(s,key){
  map.on('mousemove', LAYER_DICT[key], function (e) {
    if (e.features.length > 0) {
      if (hoveredStateId) {
        var geoid = e.features[0].properties.GEOID10
        var obj = map.getFeatureState({ source: SOURCE_DICT[key], sourceLayer: SOURCELAYER_DICT[key], id: geoid });
        var arr = createMoveTableArray(s,geoid,obj)
        addTable3(arr)

        map.setFeatureState(
          { source: SOURCE_DICT[key], id: hoveredStateId, sourceLayer:SOURCELAYER_DICT[key]}, { hover: false });
        }
        hoveredStateId = e.features[0].id;
        map.setFeatureState(
          { source: SOURCE_DICT[key], id: hoveredStateId, sourceLayer:SOURCELAYER_DICT[key]}, { hover: true });
        }
      });
      map.on('mouseleave', LAYER_DICT[key], function () {
        if (hoveredStateId) {
          map.setFeatureState({ source: SOURCE_DICT[key], id: hoveredStateId, sourceLayer:SOURCELAYER_DICT[key]}, { hover: false });
        }
        hoveredStateId = null;
        $('#move').text("")
      });
    }
