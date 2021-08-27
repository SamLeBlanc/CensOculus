//// Methods pertaining to the selection of Realms and Concepts

// Return the available Concepts in each Realm
const getRealmOptions = realm => {
  if (realm == 'Total')             options = { P1: 'Total Population' }

  else if (realm == 'Urban')        options = { P2: 'Urban and Rural Population',
                                                H2: 'Urban and Rural Housing Units' }

  else if (realm == 'Race')         options = { P8: 'Race',
                                                P6: 'Race (Total Races Tallied)',
                                                P10:'Race for 18+ Population',
                                                H6: 'Race of Householder',
                                                H8: 'Race of Householder (by Total Races Tallied)' }

  else if (realm == 'Ethnicity')    options = { P4: 'Hispanic or Latino Origin',
                                                P5: 'Hispanic or Latino Origin (by Race)',
                                                P7: 'Hispanic or Latino Origin (by Race, Total Races Tallied)',
                                                P9: 'Not Hispanic or Latino Origin (by Race)',
                                                H7: 'Hispanic or Latino Origin of Householder (by Race of Householder)',
                                                H9: 'Hispanic or Latino Origin of Householder (by Race, Total Races Tallied)' }

  else if (realm == 'Housing')      options = { H1: 'Total Housing Units',
                                                H4: 'Tenure',
                                                H22:'Allocation of Tenure',
                                                H5: 'Vacany Status',
                                                H21:'Allocation of Vacancy Status',
                                                H13:'Household Size',
                                                H10:'Total Population in Housing Units',
                                                H11:'Total Population in Housing Units (by Tenure)',
                                                H6: 'Race of Householder',
                                                H8: 'Race of Householder (by Total Races Tallied)',
                                                H7: 'Hispanic or Latino Origin of Householder (by Race of Householder)',
                                                H9: 'Hispanic or Latino Origin of Householder (by Race, Total Races Tallied)'}
  else options = {}
  return options
}

// To be added:

//  <option value="H12">H12 - AVERAGE HOUSEHOLD SIZE OF OCCUPIED HOUSING UNITS BY TENURE</option>
//  <option value="H14">H14 - TENURE BY RACE OF HOUSEHOLDER</option>
//  <option value="H15">H15 - TENURE BY HISPANIC OR LATINO ORIGIN OF HOUSEHOLDER</option>
//  <option value="H16">H16 - TENURE BY HOUSEHOLD SIZE</option>
//  <option value="H17">H17 - TENURE BY AGE OF HOUSEHOLDER</option>
//  <option value="H18">H18 - TENURE BY HOUSEHOLD TYPE BY AGE OF HOUSEHOLDER</option>
//  <option value="H19">H19 - TENURE BY PRESENCE OF PEOPLE UNDER 18 YEARS (EXCLUDING HOUSEHOLDERS, SPOUSES, AND UNMARRIED PARTNERS)</option>
//  <option value="H20">H20 - OCCUPIED HOUSING UNITS SUBSTITUTED</option>

// Create the dropdown select for Concepts based on Realm
const getRealmSelectString = options => {
  str = `<span>Concept&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span> <select id='concept-select-' style='width:280px;' onchange='collectSettings(); updateConcept();'>
  <option value="" disabled selected>Select a Concept</option>`;
  Object.keys(options).forEach( k => {
    str += (` <option value='${k}'>${options[k]}</option>`);
  })
  str += (` </select>`);
  return str
}

// Set Realm dropdown selection list
const setRealmSelect = str => {
  $('#-concept').html(str)
}

// Clear variable dropdown select list
const clearVariableSelect = () => {
  $('#-variable').html(`<span>Variable&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
  <select id="variable-select-0" style="width:280px;" onchange="collectSettings(); update();">
    <option value="" disabled selected>Select a Concept</option></select>`)
}

// Setup for default Realm choice in page load
const realmSetup = () => {
  let temp = $('#realm-select-');
  temp[0].selectedIndex = 0;
}
