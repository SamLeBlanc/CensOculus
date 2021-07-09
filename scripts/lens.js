const updateBar = e => {
  let geoid = getBarGeoid();
  let name = getBarName(geoid);
  let area = getBarArea();
  let pop = getBarPop();
  let den = formatDensity(pop, area);
  flag_url_ = getFlagUrl(geoid)
  if (geoid) wiki_url_ = getWikiUrl(geoid);
  getHeldData()
  setBarText(name, geoid, area, pop, den, flag_url_, wiki_url_)
}

const setBarText = (name, geoid, area, pop, den, flag_url_, wiki_url_) => {
  $('#b-name').text(name).css("font-weight","900")
  if (Object.keys(heldDistricts).length > 1) $('#b-geoid').text('n/a').css('color','grey');
  else $('#b-geoid').text(geoid).css('color','black');
  if (area > 999) area = numberWithCommas(area)
  $('#b-area').text(area)
  $('#b-pop').text(numberWithCommas(pop))
  $('#b-den').text(den)
  $('#flag-link').attr("href", flag_url_)
}

const getBarName = geoid => Object.keys(heldDistricts).length > 1 ? multiName() : singleName(geoid);

const singleName = geoid => {
  let name = Object.values(heldDistricts)[0].NAME10;
  return fixName(name, geoid)
}

const multiName = () => {
  let len = Object.keys(heldDistricts).length;
  let suffix = getBarNameSuffix();
  return suffix ? `${len}\xa0${BAR_SUFFIX[SETTINGS["Geo"]]} in ${suffix}` : `${len}\xa0${BAR_SUFFIX[SETTINGS["Geo"]]}`;
}

const getBarGeoid = () => Object.keys(heldDistricts).length >= 1 ? Object.keys(heldDistricts)[0] : null;

const allEqual = arr => arr.every( v => v === arr[0] );
const sameState = id_list => allEqual(id_list.map(g => g.substring(0,2))) ? true : false;
const sameCounty = id_list => allEqual(id_list) ? true : false;
const countySuffix = id_list => `${FULL_COUNTY_NAME[id_list[0]]}, ${CODE_TO_STATE[id_list[0].substring(0,2)]}`;
const stateSuffix = id_list => STATE_TO_NAME[CODE_TO_STATE[id_list[0].substring(0,2)]];

const getBarNameSuffix = () => {
  let check = (['state','county','tract','group','place','uschool','csub'].includes(SETTINGS['Geo'])) ? true : false;
  if (!check) return false
  let id_list = Object.values(heldDistricts).map(d => d.GEOID10.substring(0,5));
  if (sameCounty(id_list)) return countySuffix(id_list)
  if (sameState(id_list)) return stateSuffix(id_list)
  else return null
}

const fixName = (name, geoid) => {
  let geo = SETTINGS['Geo'];
  if (geo == 'county') name = FULL_COUNTY_NAME[geoid];
  if (geo == 'tract') name = `Tract in ${FULL_COUNTY_NAME[geoid.substring(0,5)]}`;
  if (geo == 'group') name = `Block Group in ${FULL_COUNTY_NAME[geoid.substring(0,5)]}`;
  if (['county','tract','group','uschool','csub','place'].includes(geo)){
    name = `${name}, ${CODE_TO_STATE[geoid.substring(0,2)]}`;
  }
  return name
}

const getBarArea = () => {
  let metersSq = d3.sum(Object.values(heldDistricts).map(d => d.ALAND10));
  return metersSq2MilesSq(metersSq);
}

const getBarPop = () => {
  return d3.sum(
    LORAX["P1"].filter(d => {
      return Object.values(heldDistricts)
      .map(d => d.GEOID10)
      .includes(d["GEOID10"]) && d["SIZE"] == SETTINGS["Geo"].toUpperCase()
      })
    .map(d => d.P001001)
  );
}

const formatDensity = (pop,area) => {
  let den = pop / area;
  if (den > 30) return numberWithCommas(customRound(den, 1))
  if (den > 2) return customRound(den, 2)
  return customRound(den, 3)
}
