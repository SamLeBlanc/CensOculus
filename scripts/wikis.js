// Methods for dealing with the Wiki Mode
// Clicking on a state, county, or place will open its Wikipedia page

// Combo method for getting the wikipedia url for a given geoid
const getWikiUrl = geoid => {
  let geo = SETTINGS["Geo"];
  let url_ = null;
  if (['nation','state','county'].includes(geo)) url_ = regularWikiUrl(geoid);
  else if (['place'].includes(geo)) url_ = placeWikiUrl(geoid);
  if (url_) return url_
  else return ""
}

// Basic Wikipedia url format
const regularWikiUrl = geoid => `https://en.wikipedia.org/wiki/${WIKI_NAME[geoid].replace(/ /g,"_")}`;

// Wikipedia url when dealing with a census-designated place
const placeWikiUrl = geoid => {
  let code = geoid.substring(0,2);
  let state = CODE_TO_STATE[code];
  let state_name = STATE_TO_NAME[state];
  let full = `${Object.values(heldDistricts)[0].NAME}, ${state_name}`.replace(/ /g,"_");
  return `https://en.wikipedia.org/wiki/${full}`
}
