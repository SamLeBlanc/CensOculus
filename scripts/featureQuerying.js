function featureQuery(){
  var geo = $('#geo-select-').find(":selected").val();
  var source = SOURCE_DICT[geo]
  F = map.queryRenderedFeatures()
  G = []
  H = []
  if (F.length < 10000){
    F.forEach((element) => {
      if(element.source == source && !H.includes(element.id)){
        G.push(element)
        H.push(element.id)
      }
    });
  }
}
