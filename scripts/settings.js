// // These methods pertain to the SETTINGS object, which stores all of the current CensOculus settings
// // The SETTINGS objects allows maps to be easily saved or restored and allows for easy trasnition between maps

SETTINGS = {};

// This method collects the settings from the user's settings panel (and also the map object itself)
// Then, these settings are applied to update the SETTINGS object
// Also, here we set the new token in the Save Map sidebar
const collectSettings = () => {
  SETTINGS = {
      "Year":         $('#year-select-').find(':selected').val(),
      "Geo":          $('#geo-select-').find(':selected').val(),
      "Realm":        $('#realm-select-').find(':selected').val(),
      "Concept":      $('#concept-select-').find(':selected').val(),
      "Variable":     $('#variable-select-0').find(':selected').val(),
      "3D":           $('#3d-mode').is(":checked"),
      "Height":       $('#height').val(),
      "Scheme":       $('#color-select').find(':selected').val(),
      "Scale":        $('#scale-select').find(':selected').val(),
      "TileOpacity":  parseFloat($('#tileopacity-v').val()),
      "NumFormat":    $('#numformat-select').find(':selected').val(),
      "Accumulate":   $('#accumulate').is(":checked"),
      "FlagMode":     $('#flag-mode').is(":checked"),
      "WikiMode":     $('#wiki-mode').is(":checked"),
      "Center":       getCenter(),
      "Zoom":         parseFloat(customRound(map.getZoom(),5)),
      "Pitch":        parseFloat(customRound(map.getPitch(),0)),
      "Bearing":      parseFloat(customRound(map.getBearing(),0)),
  };
  $('#settings-json').val(JSON.stringify(SETTINGS).replaceAll(",", ", ")); // the sets the proper token in the Save Map sidebar
}

// The opposite of collectSettings(), this takes a SETTINGS token and re-configures the map to fit
// Also updates the token in the Save Map sidebar
const distributeSettings = () => {
  $('#year-select-').val(SETTINGS['Year']);
  $('#geo-select-').val(SETTINGS['Geo']);
  $('#concept-select-').val(SETTINGS['Concept']);
  $('#realm-select-').val(SETTINGS['Realm']);
  $('#variable-select-0').val(SETTINGS['Variable']);
  $('#3d-mode').prop("checked", SETTINGS['3D']);
  $('#height').val(SETTINGS['Height']);
  $('#color-select-').val(SETTINGS['Scheme']);
  $('#scale-select-').val(SETTINGS['Scale']);
  $('#tileopacity-v').val(parseFloat(SETTINGS["TileOpacity"]));
  $('#numformat-select').val(SETTINGS['NumFormat']);
  $('#accumulate').prop("checked", SETTINGS['Accumulate']);
  $('#flag-mode').prop("checked", SETTINGS['FlagMode']);
  $('#wiki-mode').prop("checked", SETTINGS['WikiMode']);
  $('#zoom-v').val(parseFloat(SETTINGS["Zoom"]));
  $('#pitch-v').val(parseFloat(SETTINGS["Pitch"]));
  $('#bearing-v').val(parseFloat(SETTINGS["Bearing"]));
  $('#settings-json').val(JSON.stringify(SETTINGS).replaceAll(",", ", "));
}

// Distribute the Mapbox map settings from the SETTINGS object
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
