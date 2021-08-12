// // These methods pertain to loading data into the browser from the /data/ folder
// // Data is uploaded via the d3 library from CSV format

// Because of large size, census counts are split by concept and thus each concept must be loaded in seperately
// Data is loaded in the custom structure called LORAX, where is remains split by concept
// Actually quite an smart solution for managing such an enormous data set
// I have tried many options but this seems to be the most effective
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

// Loads in the urls for all of the state, county, and municipal flags
// Urls were painstakingly compiled from CRW Flags (https://www.crwflags.com/fotw/flags/)
const loadFlagData = () => {
  d3.csv(`data/flagData6.csv`).then(data => {
    FLAGS = data.filter( () => true );
  });
}

// Loads in the list of all variables and concepts
// Then sorts are returns all variables in the given concept
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

// Creates more readable variable names by removing certain repeated and uniformative phrases
const getVariableLabelList = () => {
  d3.csv(`data/2010/Variables_10.csv`).then(data => {
    data.forEach(d => replaceRepeatedTags(d))
  }).then(() => updateConcept())
}

// See getVariableLabelList()
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
