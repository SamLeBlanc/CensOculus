// // Methods pertaining to loading data into the browser from the /data/ folder
// Data is uploaded via the d3 library, from CSV format


// Loads Census counts by Concept
// Because of large size, **files are split by concept** and thus each concept must be loaded in seperately
// Data is loaded in the custom structure called LORAX, where it remains split by concept
// Actually, quite an smart solution for managing such an enormous data set
// I have tried many options, but this seems to be the most effective
const loadConceptData = async (concept) => {
  try {
    await d3.csv(`data/2010/${concept}.csv`).then(data => {
      let keys = Object.keys(data[0]);
      data.forEach(d => {
        keys.forEach(k => {
          if (k != 'GEOID10' && k != 'SIZE') d[k] = +d[k];
        })
      });
      LORAX[concept] = data.filter( () => true );
    });
  } catch(error) {
    console.log(`Error loading Concept data. [loadConceptData - ${error}]`);
  }
}

// Loads in the Almanac data by year
// The Almanac contains the geoid, name, and land area of all tiles in a given year
// Neccesary for calculting for naming and calculating density
const loadAlmanacData = async(year) => {
  try {
    ALMANAC[year] = await d3.csv(`data/almanac${year}.csv`);
  } catch (error) {
    console.log(`Error loading Almanac data. [loadAlmanacData - ${error}]`);
  }
}

// Loads in the urls for all of the state, county, and municipal flags
// Urls were painstakingly compiled from CRW Flags (https://www.crwflags.com/fotw/flags/)
const loadFlagData = async () => {
  try {
    FLAGS = await d3.csv(`data/flagData6.csv`);
  } catch (error) {
    console.log(`Error loading Flag data. [loadFlagData - ${error}]`);
  }
}

// Loads in the list of all variables in a given concept
const loadVariablesByConcept = async(concept) => {
  try {
    VLbC[concept] = await d3.csv(`data/2010/Variables_10.csv`);
    VLbC[concept] = VLbC[concept]
      .filter(d => d["Group"] == concept)
      .map(d => d.Name)
  } catch(error) {
    console.log(`Error loading Variable names. [loadVariablesByConcept - ${error}]`);
  }
}

// Creates more readable variable names by removing certain repeated and uniformative phrases
// see replaceRepeatedTags()
const loadFullVariableList = async() => {
  try {
    full_list = await d3.csv(`data/2010/Variables_10.csv`);
    full_list.forEach(d => replaceRepeatedTags(d))
    updateConcept();
  } catch (error) {
    console.log(`Error loading and replacing Variable names. [loadFullVariableList - ${error}]`);
  }
}

// See loadFullVariableList()
const replaceRepeatedTags = d => {
  TAG[d.Name] = d.Label
  .replace("Total!!","")
  .replace("Total races tallied!!","");
  TAG[`${d.Name}P`] = ("[%] ")
    .concat(d.Label
      .replace("Total!!","")
      .replace("Total races tallied!!","")
    );
  TAG[`${d.Name}D`] = ("[Dense] ")
    .concat(d.Label
      .replace("Total!!","")
      .replace("Total races tallied!!","")
    );
}
