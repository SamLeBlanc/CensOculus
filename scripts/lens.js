// // The Lens is the name for the right sidebar that opens when an area is held (via clicking on the tile)
// // These methods pertain to the data and text held within the Lens

// Combo method to update all of the features of the Lens
const updateLens = e => {
  let geoid = getLensGeoid();
  let name = getLensName(geoid);
  let area = getLensArea();
  let pop = getLensPop();
  let den = formatDensity(pop, area);
  let flag_url_ = getFlagUrl(geoid) // see flags.js
  if (geoid) wiki_url_ = getWikiUrl(geoid); // see wikis.js
  getHeldData()
  setLensText(name, geoid, area, pop, den, flag_url_, wiki_url_)
}

// Find the geoid that the Lens will be focusing on
// If more than one area is being held, this will only return the first geoid of
const getLensGeoid = () => Object.keys(heldDistricts).length >= 1 ? Object.keys(heldDistricts)[0] : null;

// There are several methods pertaining to the name displayed on the Lens
// This depends on the geography size and whether there are multiple holds or just one
const getLensName = geoid => Object.keys(heldDistricts).length > 1 ? multiName() : singleName(geoid);

// Name if only a single area is being held
const singleName = geoid => {
  let n = Object.values(heldDistricts)[0].NAME10;
  let name = fixName(n, geoid)
  return name
}
// Reformating the name to be nicer, uses some awfully long dictionaries, must update this later
const fixName = (n, geoid) => {
  let geo = SETTINGS['Geo'];
  if (geo == 'county') n = FULL_COUNTY_NAME[geoid];
  if (geo == 'tract') n = `Tract in ${FULL_COUNTY_NAME[geoid.substring(0,5)]}`;
  if (geo == 'group') n = `Block Group in ${FULL_COUNTY_NAME[geoid.substring(0,5)]}`;
  if (['county','tract','group','uschool','csub','place'].includes(geo)){
    n = `${n}, ${CODE_TO_STATE[geoid.substring(0,2)]}`;
  }
  return n
}

// Name if multiple areas are being held
const multiName = () => {
  let len = Object.keys(heldDistricts).length;
  let suffix = getLensNameSuffix();
  return suffix ? `${len}\xa0${LENS_SUFFIX[SETTINGS["Geo"]]} in ${suffix}` : `${len}\xa0${LENS_SUFFIX[SETTINGS["Geo"]]}`;
}
// Creates the proper suffix for a multiName based on whether the held areas are in the same county or state
const getLensNameSuffix = () => {
  const allEqual = arr => arr.every( v => v === arr[0] );
  const sameState = id_list => allEqual(id_list.map(g => g.substring(0,2))) ? true : false;
  const sameCounty = id_list => allEqual(id_list) ? true : false;
  const countySuffix = id_list => `${FULL_COUNTY_NAME[id_list[0]]}, ${CODE_TO_STATE[id_list[0].substring(0,2)]}`;
  const stateSuffix = id_list => STATE_TO_NAME[CODE_TO_STATE[id_list[0].substring(0,2)]];

  let check = (['state','county','tract','group','place','uschool','csub'].includes(SETTINGS['Geo'])) ? true : false;
  if (!check) return false
  let id_list = Object.values(heldDistricts).map(d => d.GEOID10.substring(0,5));
  if (sameCounty(id_list)) return countySuffix(id_list)
  if (sameState(id_list)) return stateSuffix(id_list)
  else return null
}

// Returns the summed area of one or more held areas, after converting from m^2 into mi^2
const getLensArea = () => {
  let metersSq = d3.sum(Object.values(heldDistricts).map(d => d.ALAND10));
  let milesSq = metersSq2MilesSq(metersSq)
  return milesSq;
}

// Returns the summed total population of one or more held areas
// This method filters the LORAX data structure (for P1) for only the heldIds and the sums the population
const getLensPop = () => {
  return d3.sum(
    LORAX["P1"].filter(d => {
      return Object.values(heldDistricts)
      .map(d => d.GEOID10)
      .includes(d["GEOID10"]) && d["SIZE"] == SETTINGS["Geo"].toUpperCase()
      })
    .map(d => d.P001001)
  );
}

// Using the previously calculated area and population, this method calculates and formats the density of one of more held areas
const formatDensity = (pop,area) => {
  let den = pop / area;
  if (den > 30) return numberWithCommas(customRound(den, 1))
  if (den > 2) return customRound(den, 2)
  return customRound(den, 3)
}

// Set the Lens div text based on all of the previously calculated values in this section
// Also set the flag and wiki url as well, those url methods are found in other sections
const setLensText = (name, geoid, area, pop, den, flag_url_, wiki_url_) => {
  $('#lens-name').text(name).css("font-weight","900")
  if (Object.keys(heldDistricts).length > 1) $('#lens-geoid').text('n/a').css('color','grey');
  else $('#lens-geoid').text(geoid).css('color','black');
  if (area > 999) area = numberWithCommas(area)
  $('#lens-area').text(area)
  $('#lens-pop').text(numberWithCommas(pop))
  $('#lens-density').text(den)
  $('#flag-link').attr("href", flag_url_)
}
