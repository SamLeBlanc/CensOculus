// Methods pertaining to the loading icon that appears when the map is loading

let startTime = 0;
let endTime = 0;

// For moving loading icon in and out of view
// Argument i is to allow for multiple loading icons
// Currently there are 2, one for loading data and the other for loading a map
const startLoadingIcon = i => $(`#loading-${i}`).css('left',`${$('#title').width() -29}px`);
const endLoadingIcon = i => $(`#loading-${i}`).css('left','-500px');

// Mapbox event to show loading icon when map is loading
// Idle event is fired when map is DONE idling, thus it turns off the loading icon
// If the current time is more than 1 second since last update, the loading icon is turned on
const idleLoadingIcon = () => {
  map.on('idle', function() {
      endLoadingIcon(1)
      collectSettings()
      $('#settings-json').val(JSON.stringify(SETTINGS).replaceAll(",", ", "));
      var d = new Date();
      startTime = d.getTime();
  });

  map.on('render', function() {
      var d = new Date();
      endTime = d.getTime();
      if(endTime - startTime > 1000) startLoadingIcon(1)
  });
}
