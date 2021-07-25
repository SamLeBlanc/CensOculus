
function threeDContolSetup(){
  map.on('zoomend', function() {
  	$('#zoom-label').text(Math.round(map.getZoom()*10)/10);
  });

  map.on('pitchend', function() {
  	$('#pitch-label').text(Math.round(map.getPitch()));
  });

  $('#zoom-v').val(3.6)
  $('#pitch-v').val(0)
}

function updateZoom(val){
  map.flyTo({
    zoom: val,
    essential: true
  });
}

function updateBearing(val){
  map.flyTo({
    bearing: val,
    essential: true
  });
}

function unpitch(){
  map.flyTo({
    pitch: 0,
    essential: true
  });
}

function lower48View(){
  map.fitBounds([[-138,24],[-66,50]]);
}
function alaskaView(){
  map.fitBounds([[-189,48],[-124,73]]);
}
function hawaiiView(){
  map.fitBounds([[-164,16],[-150,25]]);
}

function puertoRicoView(){
  map.fitBounds([[-68.2,17.3],[-65.1,19]]);
}

function panMap(a){
  let easing = t => t * (2 - t);
  map.panBy(a, {
    easing: easing
  });
}

function updatePitch(val){
  map.flyTo({
    pitch: val,
    essential: true
  });
}
