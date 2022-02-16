//// Methods pertaining to the selection of Realms and Concepts

// Return the available Concepts in each Realm
const getRealmOptions = async(realm) => {
 let o = await d3.csv('data/auxiliary/realm_list.csv')
 if (o) return o.filter( d => d.Realm == realm)
 else options = {}
  return options
}

// To be added:

//  <option value="H12">H12 - AVERAGE HOUSEHOLD SIZE OF OCCUPIED HOUSING UNITS BY TENURE</option>
//  <option value="H14">H14 - TENURE BY RACE OF HOUSEHOLDER</option>
//  <option value="H15">H15 - TENURE BY Ethnicity OF HOUSEHOLDER</option>
//  <option value="H16">H16 - TENURE BY HOUSEHOLD SIZE</option>
//  <option value="H17">H17 - TENURE BY AGE OF HOUSEHOLDER</option>
//  <option value="H18">H18 - TENURE BY HOUSEHOLD TYPE BY AGE OF HOUSEHOLDER</option>
//  <option value="H19">H19 - TENURE BY PRESENCE OF PEOPLE UNDER 18 YEARS (EXCLUDING HOUSEHOLDERS, SPOUSES, AND UNMARRIED PARTNERS)</option>
//  <option value="H20">H20 - OCCUPIED HOUSING UNITS SUBSTITUTED</option>

// Create the dropdown select for Concepts based on Realm
const getRealmSelectString = options => {
  str = `<select id='concept-select-' style='width:250px;' onchange='collectSettings(); updateConcept();'>
  <option value="" disabled selected>Select a Concept</option>`;
  let o = options.map( d => [d.Concept, d.Name])
  o.forEach( d => {
    str += (` <option value='${d[0]}'>${d[1]}</option>`);
  })
  str += (` </select>`);
  hideAllLayers() /////////////////////////
  return str
}

// Set Realm dropdown selection list
const setRealmSelect = str => {
  $('#-concept').html(str)
}

// Clear variable dropdown select list
const clearVariableSelect = () => {
  $('#-variable').html(`<select id="variable-select-0" style="width:250px;" onchange="collectSettings(); update();">
    <option value="" disabled selected>Select a Concept</option></select>`)
}

// Setup for default Realm choice in page load
const realmSetup = () => {
  let temp = $('#realm-select-');
  temp[0].selectedIndex = 0;
}
