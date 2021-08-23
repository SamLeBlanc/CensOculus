// // Methods for collecting and formating the data of the held geographies
// Users can hold multiple districts by hitting the + button on the left.
// Then, the combined data of those places is calculted

// Combo
const getHeldData = () => {
  let heldData = {};
  let H = getBaseLoraxData(SETTINGS['Geo'], SETTINGS['Concept']);
  heldData = getHeldLoraxData(H, heldData);
  addheldTable(heldData2Array(heldData));
  return heldData
}

// Filter LORAX by the concept, geo, and only the heldIds that we want
const getBaseLoraxData = (geo,concept) => LORAX[concept].filter(d => (Object.keys(heldDistricts).includes(d.GEOID10) && d.SIZE == geo.toUpperCase() ) );

// Messy method for summing the data in the previous object, should rework to make more clear
const getHeldLoraxData = (H,heldData) => {
  for (const v in H[0]) {
    if (typeof H[0][v] == 'number') heldData[v] = 0;
  }
  H.forEach(h => {
      for (const v in h) {
        if (typeof h[v] == 'number'){
          heldData[v] += h[v];
        }
      }
    })
  return heldData
}
