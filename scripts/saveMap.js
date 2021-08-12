// Methods for the copying and loading of tokens in the Save Map sidebar
// Maps can be saved by copying the string version of the SETTINGS object
// Then by pasting it back in, users can access previous maps

// Used for copying the token from the textarea
const copyButton = () => {
  $("#settings-json").select();
  $('#save-message').text('')
  try {
    document.execCommand('copy');
    $('#save-message').text('Copied!')
  } catch (error) {
    $('#save-message').text('Failed to copy...')
  }
}

// Parses user token and attempts to recreate the map
// If an error occurs, the token will be rejected and the map will not change (hopefully...)
const goButton = () => {
  let token = $('#settings-json').val();
  try {
    SETTINGS = JSON.parse(token);
    distributeSettings();
    closeNav(4);
    update();
    $('#save-message').text('Successful!')
  } catch (error) {
    $('#save-message').text('Invalid token...')
    return
  }
}
