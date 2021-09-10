//// Methods for the copying and loading of tokens in the Save Map sidebar
// Maps can be saved by copying the string version of the SETTINGS object
// Then by pasting it back in, users can access previous maps

// Used for copying the token from the textarea
const copyButton = () => {
  $("#settings-json").select();
  $('#save-message').text('');
  try {
    document.execCommand('copy');
    $('#save-message').text('Copied!');
  } catch (error) {
    $('#save-message').text('Failed to copy...');
  }
}

// Parses user token and attempts to recreate the map
// If an error occurs, the token will be rejected and the map will not change (hopefully...)
const goButton = async() => {
  let token = $('#settings-json').val();
  try {
    await updateMapFromToken(token)
    $('#save-message').text('Successful!');
  } catch (error) {
    await updateMapFromToken(default_token);
      $('#save-message').text('Something went wrong...');
  }
}

const updateMapFromToken = async(token) => {
  SETTINGS = JSON.parse(token);
  distributeMapControls();
  let temp_concept = SETTINGS["Concept"];
  let temp_variable = SETTINGS["Variable"];
  let temp_realm = SETTINGS["Realm"];
  distributeSettings();
  await updateRealm()
  SETTINGS["Concept"] = temp_concept;
  distributeSettings();
  await updateConcept()
  SETTINGS["Variable"] = temp_variable;
  distributeSettings();
  await updateVariable();
  await updatePaint();
  distributeSettings();
  update();
}

// SETTINGS["Geo"] = 'state';
// SETTINGS["Realm"] = 'Race';
// await updateRealm()
// SETTINGS["Concept"] = 'P6';
// distributeSettings();
// await updateConcept();
// SETTINGS["Variable"] = 'P006003P';
// distributeSettings();
// update();
// lower48View();
