const updateFlag = () => {
  let geo = SETTINGS['Geo'];
  FLAGS
  .filter(d => d["Size"] == geo)
  .forEach(f => map.setFeatureState({ source: SOURCE_DICT[geo], sourceLayer: SOURCELAYER_DICT[geo], id: f.GEOID10 }, { flag: SETTINGS['FlagMode'] } ) )
}

const getFlagUrl = geoid => {
  if (["nation","state","county","place"].includes(SETTINGS['Geo'])) {
    suffix = getFlagUrlSuffix(geoid)
    fullUrl = craftFlagUrl(suffix)
    return fullUrl
 } else {
   return "images/noFlag.gif"
 }
}

const getFlagUrlSuffix = geoid => {
  let F = FLAGS.filter(d => d["GEOID10"] == geoid );
  if (F.length > 1) {
    throw `Multiple flag urls found: ${geoid}`
  } else if (F.length == 1) {
    return F[0].UrlSuffix
  } else {
    return ""
  }
}

const craftFlagUrl = suffix => {
  if (suffix.substring(0,5) == '/imag') {
    return `https://www.crwflags.com/fotw${suffix}`
  } else if (suffix) {
    return suffix
  } else {
    return "images/noFlag.gif"
  }
}

const updateFlagSources = geoid => {
  if ($('#flag-mode').is(":checked")) {
    $('#flog_img').attr("src", getFlagUrl(geoid));
    $('#flog_img2').attr("src", getFlagUrl(geoid));
  }
}
