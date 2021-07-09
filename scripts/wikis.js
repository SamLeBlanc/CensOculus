const getWikiUrl = geoid => {
  let geo = SETTINGS["Geo"];
  let url_ = null;
  if (['nation','state','county'].includes(geo)) url_ = regularWikiUrl(geoid);
  else if (['place'].includes(geo)) url_ = placeWikiUrl(geoid);
  if (url_) {
    setWikiUrl(url_)
    return url_
  }
}

const regularWikiUrl = geoid => `https://en.wikipedia.org/wiki/${WIKI_NAME[geoid].replace(/ /g,"_")}`;

const placeWikiUrl = geoid => {
  let code = geoid.substring(0,2);
  let state = CODE_TO_STATE[code];
  let state_name = STATE_TO_NAME[state];
  let full = `${Object.values(heldDistricts)[0].NAME10}, ${state_name}`.replace(/ /g,"_");
  return `https://en.wikipedia.org/wiki/${full}`
}

const setWikiUrl = url_ => {
  $("#wiki-link").attr("href", url_)
  if ($('#wiki-mode').is(":checked")) window.open(url_,'_blank');
}
