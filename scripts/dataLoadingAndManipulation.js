const loadDataFromCSV = concept => {
  d3.csv(`data/2010/${concept}.csv`).then(data => {
    let keys = Object.keys(data[0]);
    data.forEach(d => {
      keys.forEach(k => {
        if (k != 'GEOID10' && k != 'SIZE') d[k] = +d[k];
      })
    });
    LORAX[concept] = data.filter( () => true );
  });
}

const loadFlagData = () => {
  d3.csv(`data/flagData6.csv`).then(data => {
    FLAGS = data.filter( () => true );
  });
}

const getVariableListByConcept = concept => {
  d3.csv(`data/2010/Variables_10.csv`).then(data => {
    D = data.filter(d => d["Group"] == concept)
  }).then(() => {
    VLbC[concept] = [];
    D.forEach(d => {
      VLbC[concept].push(d.Name)
    })
  })
}

const getVariableLabelList = () => {
  d3.csv(`data/2010/Variables_10.csv`).then(data => {
    data.forEach(d => replaceRepeatedTags(d))
  }).then(() => updateConcept())
}

const replaceRepeatedTags = d => {
  TAG[d.Name] = d.Label
  .replace("Total!!","")
  .replace("Total races tallied!!","");
  TAG[`${d.Name}P`] = ("[%] ")
  .concat(d.Label
    .replace("Total!!","")
    .replace("Total races tallied!!",""));
  TAG[`${d.Name}D`] = ("[D] ")
  .concat(d.Label
    .replace("Total!!","")
    .replace("Total races tallied!!",""));
}
