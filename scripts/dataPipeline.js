// // // Methods pertaining to loading data into the browser from the /data/ folder
// Data is uploaded via the d3 library, from CSV format

// Loads Census counts by Concept
// Because of large size, **files are split by concept** and thus each concept must be loaded in seperately
// Data is loaded in the custom structure called LORAX, where it remains split by concept
// Actually, quite an smart solution for managing such an enormous data set
// I have tried many options, but this seems to be the most effective
const loadConceptData = async (concept) => {
  try {
    await d3.csv(`data/2010/${SETTINGS["Year"]}_${concept}.csv`).then(data => {
      let keys = Object.keys(data[0]);
      // convert all values except GEOID and SIZE to numeric type
      data.forEach(d => {
        keys.forEach(k => {
          if (k != 'GEOID10' && k != 'SIZE') d[k] = +d[k];
        })
      });
      LORAX[concept] = data.filter( () => true ); // idk what this does but it breaks without it?
    });
  } catch(error) {
    console.log(`Error loading Concept ${concept} data. [loadConceptData - ${error}]`);
  }
}

// Loads in the Almanac data by year
// The Almanac contains the geoid, name, and land area of all tiles in a given year
// Neccesary for naming and calculating densities
const loadAlmanacData = async(year) => {
  try {
    ALMANAC[year] = await d3.csv(`data/almanac${year}.csv`);
  } catch (error) {
    console.log(`Error loading Almanac ${year} data. [loadAlmanacData - ${error}]`);
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

// Loads in the list of all variables names in a given concept
const loadVariablesByConcept = async(concept) => {
  try {
    VAR_NAMES_BY_CONCEPT[concept] = await d3.csv(`data/2010/Variables_10.csv`);
    VAR_NAMES_BY_CONCEPT[concept] = VAR_NAMES_BY_CONCEPT[concept]
      .filter(d => d["Group"] == concept)
      .map(d => d.Name)
  } catch(error) {
    console.log(`Error loading Variable names. [loadVariablesByConcept - ${error}]`);
  }
}

// Creates more readable variable names by removing certain repeated and uniformative phrases using replaceRepeatedTags()
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
