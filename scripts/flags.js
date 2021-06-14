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
