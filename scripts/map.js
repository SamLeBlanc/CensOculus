// Methods pertaining to the initial loading of the map on first page load

// Create the Mapbox map
const initializeMap = () => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    center: [-104.80, 38.85],
    zoom: 3.6,
    pitch: 0,
    interactive: true, // true required
  });
  setupMap(map)
  return map
}

// Map setup
const setupMap = map => {
  threeDContolSetup(map) // set up the slider values to change when map changes
  map.doubleClickZoom.disable();

  // Create Geolocate button
  var geolocate = new mapboxgl.GeolocateControl({
    positionOptions: { enableHighAccuracy: true  },
    trackUserLocation: true
  });

  // Create search bar
  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    countries: 'us',
    placeholder:"Pie Town, New Mexico"
  });

  // Add Geolocate and search bar to map
  document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
  document.getElementById('geolocate').appendChild(geolocate.onAdd(map));
}
