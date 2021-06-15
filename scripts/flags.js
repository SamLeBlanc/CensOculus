function updateFlagMode(){
  geo = $('#geo-select').find(":selected").val();
  value = $('#flag-mode').is(":checked");
  FLAGS
    .filter(d => d["Size"] == geo)
    .forEach(f => {
      map.setFeatureState({ source: SOURCE_DICT[geo], sourceLayer: SOURCELAYER_DICT[geo], id: f.GEOID10 }, { flag: value } )
    })
}

function showFlag(geoid){
  let geo = $('#geo-select').find(":selected").val();
  if (["nation","state","county","place"].includes(geo)) {
    let pic = document.getElementById("flog_img");
    suffix = getFlagUrlSuffix(geoid)
    fullUrl = craftFlagUrl(suffix)
    $('#flog_img').attr("src", fullUrl);
 }
}

function getFlagUrlSuffix(geoid){
  let F = FLAGS.filter(function(d){ return d["GEOID10"] == geoid });
  if (F.length > 1) {
    throw `Multiple flag urls found: ${geoid}`
  } else if (F.length == 1) {
    return F[0].UrlSuffix
  } else {
    return ""
  }
}

function craftFlagUrl(suffix){
  if (suffix.substring(0,5) == '/imag') {
    return "https://www.crwflags.com/fotw".concat(suffix)
  } else if (suffix) {
    return suffix
  } else {
    return "images/noFlag.gif"
  }
}
