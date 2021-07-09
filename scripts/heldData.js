const getHeldData = () => {
  let geo = SETTINGS['Geo'];
  let concept = SETTINGS['Concept'];
  let heldData = {};
  let H = getBaseLoraxData(geo,concept);
  heldData = getHeldLoraxData(H, heldData);
  let arr = heldData2TableARRAY(heldData)
  addheldTable(arr)
}

const getBaseLoraxData = (geo,concept) => LORAX[concept].filter(d => (Object.keys(heldDistricts).includes(d.GEOID10) && d.SIZE == geo.toUpperCase() ) );

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
