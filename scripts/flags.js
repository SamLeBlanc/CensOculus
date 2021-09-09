//// Methods pertaining to the viewing of state, county, and municipal flags on top of the map
// URLs compiled from CRW Flags (https://www.crwflags.com/fotw/flags/)
// A nice side project, which turned into a spooky hell dream of sorting urls for days on end

// Sets all the flag feature states to false, those with a flag will later be changed to true
const updateFlagMode = () => {
  let geo = SETTINGS['Geo'];
  FLAGS.filter(d => d["Size"] == geo)
  .forEach(f => map.setFeatureState({
    source: SOURCE_DICT[geo],
    sourceLayer: SOURCELAYER_DICT[geo],
    id: f.GEOID10 },
    { flag: SETTINGS['FlagMode'] }
  ));
}

// Combination method to get the url of a potential flag
const getFlagUrl = geoid => {
  if (["nation","state","county","place"].includes(SETTINGS['Geo'])) {
    suffix = getFlagUrlSuffix(geoid);
    fullUrl = craftFlagUrl(suffix);
    return fullUrl
 } else {
   return "images/noFlag.gif"  // frowny face flag
 }
}

// Find the flag url suffix from the loaded data set
const getFlagUrlSuffix = geoid => {
  let F = FLAGS.filter(d => d["GEOID10"] == geoid );
  if (F.length > 1) throw `Multiple flag urls found. Geoid: ${geoid}. [getFlagUrlSuffix]`;
  else if (F.length == 1) return F[0].UrlSuffix;
  else return false;
}

// Some flag urls are not from CRW Flags
// If only a suffix is found, return the suffix with a proper CRW prefix
// else, use the *whole found url* (works for wiki image links)
const craftFlagUrl = suffix => {
  if (suffix.substring(0,5) == '/imag') return `https://www.crwflags.com/fotw${suffix}`;
  else if (suffix)return suffix;
  else return "images/noFlag.gif";
}

// Update the img src to the proper url for display on map
const updateFlagSources = geoid => {
  if ($('#flag-mode').is(":checked")) {
    $('#flag_img').attr("src", getFlagUrl(geoid));
    $('#flag_img2').attr("src", getFlagUrl(geoid));
  }
}
