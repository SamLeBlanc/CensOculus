let GEOID_FILTER = ['in', `GEOID${SETTINGS["Year"]}`]
let VALUE_FILTER = ['in', `GEOID${SETTINGS["Year"]}`]

const readFilteredIds = () => GEOID_FILTER.slice(2);

const filterReset = () => {
  map.setFilter(`${SETTINGS["Geo"]}-fills`, null);
  resetFilterSelects();
  $('#filter-custom').val('');
}

const resetFilterSelects = () => {
  const t = (['nation','state','county','tract','group','csub','place','ucshool'].includes(SETTINGS['Geo'])) ? false : true;
  $("#state-filter-select").val('0').prop('disabled', t);
  $("#county-filter-select").val('0').prop('disabled', t);
}

const filterByGeoid = geoid => {
  const ids = findGeoFilteredIds(geoid)
  GEOID_FILTER = ['in', `GEOID${SETTINGS["Year"]}`].concat(ids)
  map.setFilter(`${SETTINGS["Geo"]}-fills`, GEOID_FILTER);
  createCountyFilterSelect(geoid)
}

const filterByValue = (variable, value, sign) => {
  const ids = findValFilteredIds(variable, value, sign)
  VALUE_FILTER = ['in', `GEOID${SETTINGS["Year"]}`].concat(ids)
  map.setFilter(`${SETTINGS["Geo"]}-fills`, VALUE_FILTER);
}

const findValFilteredIds = (variable, value, sign) => {
  const secondConversion = (d, variable, value, sign) => {
    if (sign == '>') return ((neccesaryConversion(d, variable) > value) ? true : false);
    if (sign == '<') return ((neccesaryConversion(d, variable) < value) ? true : false);
    if (sign == 'a') return ((neccesaryConversion(d, variable) > value * 0.80) && (neccesaryConversion(d, variable) < value * 1.2) ? true : false);
  }
  return LORAX[SETTINGS["Concept"]]
    .filter( d => d[`SIZE`] == SETTINGS["Geo"].toUpperCase())
    .filter( d => secondConversion(d, variable, value, sign) )
    .map( d => d[`GEOID${SETTINGS["Year"]}`])
}

const findGeoFilteredIds = geoid => {
  return LORAX[SETTINGS["Concept"]]
    .filter( d => d[`SIZE`] == SETTINGS["Geo"].toUpperCase())
    .filter( d => d[`GEOID${SETTINGS["Year"]}`].startsWith(geoid))
    .map( d => d[`GEOID${SETTINGS["Year"]}`])
}

const createCountyFilterSelect = geoid => {
  let str = "<option value='0' selected disabled >Select a State</option>";
  if (geoid.length == 2){
    str = `<option value='0' selected disabled >Select a County</option>`
    ALMANAC[10]
     .filter( d => d['SIZE'] == 'county')
     .filter( d => d[`GEOID${SETTINGS["Year"]}`].startsWith(geoid.substring(0, 2) ))
     .filter( d => d[`GEOID${SETTINGS["Year"]}`] != (geoid.substring(0, 2) ))
     .map( d => [d[`GEOID${SETTINGS["Year"]}`], d[`NAME${SETTINGS["Year"]}`]])
     .sort( (a, b) => a[1] > b[1] ? 1 : -1 )
     .forEach( d => str = str.concat(`<option value="${d[0]}" >${d[1]}</option>`));
  $('#county-filter-select').html(str)
  }
}
