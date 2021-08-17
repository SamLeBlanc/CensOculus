// // These methods pertain to dynamic use of map information and other mapbox map abilities

// Set the initial map controls in settings sidebar, updates the labels when the map is changed
const threeDContolSetup = () => {
  map.on('zoomend', function() {
  	$('#zoom-label').text(Math.round(map.getZoom()*10)/10);
  });
  map.on('pitchend', function() {
  	$('#pitch-label').text(Math.round(map.getPitch()));
  });
  map.on('rotateend', function() {
  	$('#bearing-label').text(Math.round(map.getBearing()));
  });
  $('#zoom-v').val(3.6)
  $('#pitch-v').val(0)
}

// Update map view settings based on sliders in sidebar
const updateZoom = val => {
  map.flyTo({
    zoom: val,
    essential: true
  });
}
const updateBearing = val => {
  map.flyTo({
    bearing: val,
    essential: true
  });
}
const updatePitch = val => {
  map.flyTo({
    pitch: val,
    essential: true
  });
}

// Other map controls for easy use
const panMap = a => {
  let easing = t => t * (2 - t);
  map.panBy(a, {
    easing: easing
  });
}
const unpitch = () => {
  map.flyTo({
    pitch: 0,
    essential: true
  });
}

// Returns the center point of the map as an object: { lat:-104, lng: 38 }
const getCenter = () => {
  if (map) {
    let cen = map.getCenter();
    cen.lng = customRound(cen.lng,8);
    cen.lat = customRound(cen.lat,8);
    return cen
  }
  else return {lat:-104.800644, lng: 38.846127}
}

// Pre-set buttons t
const full52View = () => map.fitBounds([[-169,17],[-61,71]]);
const lower48View = () => map.fitBounds([[-138,24],[-66,50]]);
const alaskaView = () => map.fitBounds([[-189,48],[-124,73]]);
const hawaiiView = () => map.fitBounds([[-164,16],[-150,25]]);
const puertoRicoView = () => map.fitBounds([[-68.2,17.3],[-65.1,19]]);
const blackBeltView = () => map.fitBounds([[-94.82,25.0],[-74.21,37.12]]);
