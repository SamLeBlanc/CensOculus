SETTINGS = {};

const copyButton = () => {
  $("#settings-json").select();
  document.execCommand('copy');
  console.log('Save token copied to clipboard');
}

const goButton = () => {
  let token = $('#settings-json').val();
  SETTINGS = JSON.parse(token);
  distributeSettings();
  closeNav4();
  update();
}

const getCenter = () => {
  if (map) return map.getCenter()
  else return {lat:-104.800644, lng: 38.846127}

}

const collectSettings = () => {
  SETTINGS = {
      "Year":         $('#year-select-').find(':selected').val(),
      "Geo":          $('#geo-select-').find(':selected').val(),
      "Concept":      $('#concept-select-').find(':selected').val(),
      "Variable":     $('#variable-select-').find(':selected').val(),
      "3D":           $('#3d-mode').is(":checked"),
      "Scheme":       $('#color-select').find(':selected').val(),
      "Scale":        $('#scale-select').find(':selected').val(),
      "TileOpacity":  parseFloat($('#tileopacity-v').val()),
      "NumFormat":    $('#numformat-select').find(':selected').val(),
      "Accumulate":   $('#accumulate').is(":checked"),
      "FlagMode":     $('#flag-mode').is(":checked"),
      "WikiMode":     $('#wiki-mode').is(":checked"),
      "Center":       getCenter(),
      "Zoom":         parseFloat($('#zoom-v').val()),
      "Pitch":        parseFloat($('#pitch-v').val()),
  };
  console.log(`Settings updated`);
  $('#settings-json').val(JSON.stringify(SETTINGS).replaceAll(",", ", "));
}

const distributeMapControls = () => {
  let cen = SETTINGS["Center"];
  setTimeout(function(){
    map.flyTo({
      zoom: parseFloat(SETTINGS["Zoom"]),
      pitch: parseFloat(SETTINGS["Pitch"]),
      center: [cen['lng'],cen['lat']],
      essential: true
    });
  }, 1000);
}

const distributeSettings = () => {
  $('#year-select-').val(SETTINGS['Year']);
  $('#geo-select-').val(SETTINGS['Geo']);
  $('#concept-select-').val(SETTINGS['Concept']);
  $('#variable-select-').val(SETTINGS['Variable']);
  $('#3d-mode').prop("checked", SETTINGS['3D']);
  $('#color-select-').val(SETTINGS['Scheme']);
  $('#scale-select-').val(SETTINGS['Scale']);
  $('#tileopacity-v').val(parseFloat(SETTINGS["TileOpacity"]));
  $('#numformat-select').val(SETTINGS['NumFormat']);
  $('#accumulate').prop("checked", SETTINGS['Accumulate']);
  $('#flag-mode').prop("checked", SETTINGS['FlagMode']);
  $('#wiki-mode').prop("checked", SETTINGS['WikiMode']);
  $('#zoom-v').val(parseFloat(SETTINGS["Zoom"]));
  $('#pitch-v').val(parseFloat(SETTINGS["Pitch"]));
  distributeMapControls()
  $('#settings-json').val(JSON.stringify(SETTINGS).replaceAll(",", ", "));
  console.log(`Settings distributed`);
}

const copyToClipboard = () => {
  let copyText = document.getElementById("settings-json"); // Get text field
  copyText.select(); // Select text field
  copyText.setSelectionRange(0, 99999); // For mobile devices?
  document.execCommand("copy"); // Copy text to clipboard
}
