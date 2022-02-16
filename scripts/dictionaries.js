// // // Defining and using dictionaries for all sorts of things

let TAG = {}

let VAR_NAMES_BY_CONCEPT = {}

// Load dictionaries from auxiliary data files
const gistGet = async() => {
  globalThis.FULL_COUNTY_NAME = await d3.json('data/auxiliary/full_county_names.json');
  globalThis.WIKI_NAME = await d3.json('data/auxiliary/wikipedia_names.json');
  globalThis.NICKNAMES = await d3.json('data/auxiliary/variable_nicknames.json');
}

const SOURCE_DICT = {
  'nation':'nation',
  'state':'states',
  'county':'counties',
  'tract':'tracts',
  'group':'groups',
  'cbsa':'cbsa',
  'urban':'urban',
  'zip':'zip',
  'csub':'csub',
  'uschool':'uschool',
  'place':'place'
}

const LENS_SUFFIX = {
  'state':'States',
  'county':'Counties',
  'tract':'Tracts',
  'group':'Groups',
  'cbsa':'Metro Statisitcal Areas',
  'urban':'Urban Area',
  'zip':'Zip Codes',
  'csub':'County Subdivisions',
  'uschool':'Unified School Districts',
  'place':'Places'
}

const SOURCELAYER_DICT = {
  'nation':'nation10-6ezzk0',
  'state':'state10-3qm50z',
  'county':'counties10-86n52w',
  'tract':'tract10-5h73em',
  'group':'group10-0ljnl4',
  'cbsa':'metroSA10-6188mc',
  'urban': 'urban10-czwsdr',
  'zip': 'zip10-2lnd0m',
  'csub':'csub10-d9p9q0',
  'uschool':'uschool10-bv8a78',
  'place':'place10-2f8z0e'
}

const SOURCE_TILESET_ID = {
  'nation':'mapbox://samleblanc.61y9eb8o',
  'states':'mapbox://samleblanc.3bycdb3k',
  'counties':'mapbox://samleblanc.4ck39c64',
  'tracts':'mapbox://samleblanc.7ce2o1ox',
  'groups':'mapbox://samleblanc.aphfz3f5',
  'cbsa':'mapbox://samleblanc.7y3al5d9',
  'urban':'mapbox://samleblanc.8hnzdvf2',
  'zip':'mapbox://samleblanc.2pbmloo4',
  'csub':'mapbox://samleblanc.ds7axen5',
  'uschool':'mapbox://samleblanc.6v8clr3z',
  'place':'mapbox://samleblanc.3z4f5y9t',
}

const COLOR_DICT = {
  "Red":["#FFFFFF","#FFC0C0","#FF8080","#FF4040","#FF0000"],
  "Blue":["#FFFFFF","#C0C0FF","#8080FF","#4040FF","#0000FF"],
  "Green":["#FFFFFF","#C0EAC0","#80D580","#40C040","#00AA00"],
  "Purple":["#FFFFFF","#EBC0FF","#D680FF","#C140FF","#AC00FF"],
  "Black":["#FFFFFF","#c0c0c0","#808080","#404040","#000000"],
  "Rainbow":["#3288BD","#ABDDA4","#F2EB92","#FDAE61","#D53E4F"],
  "Viridis":["#f9e721","#5ac865","#21908d","#3b1c8c","#450256"],
  "ViridisLight":["#FFFFD9","#DAF1B3","#7FCDBB","#2FA4C2","#225EA8"],
  "Greyscale":["#F0F0F0","#c3c3c3","#969696","#696969","#3c3c3c"],
  "Heat":["#FFFFFF","#FFFD0A","#FD9909","#FE4D05","#FF0000"],
  "Magma":["#fbffb2","#f7704f","#a72066","#370065","#000000"],
  "Brown-Teal":["#8C510A","#DFC27D","#DFE9D4","#80CDC1","#01665E"],
  "Blue-Red":["#2166AC","#92C5DE","#E7E0DC","#F4A582","#B2182B"],
  "GreenII":["#edf8fb","#b2e2e2","#66c2a4","#2ca25f","#006d2c"],
  "PurpleII":["#edf8fb","#b3cde3","#8c96c6","#8856a7","#810f7c"],
  "Ocean":["#f6eff7","#bdc9e1","#67a9cf","#1c9099","#016c59"],
  "Valentine":["#f1eef6","#d7b5d8","#df65b0","#dd1c77","#980043"],
  "Forest":["#ffffcc","#c2e699","#78c679","#31a354","#006837"],
  "BurntToast":["#ffffd4","#fed98e","#fe9929","#d95f0e","#993404"],
  "Cividis":["#002051","#3c4d6e","#7f7c75","#bbaf71","#fdea45"],
  "Plasma":["#0d0887","#7e03a8","#cc4778","#f89540","#f0f921"],
  "Warm":["#6e40aa","#d23ea7","#ff5e63","#efa72f","#aff05b"],
  "Cool":["#6e40aa","#417de0","#1ac7c2","#40f373","#aff05b"],
  "Barney":["#7b3294","#c2a5cf","#f7f7f7","#a6dba0","#008837"],
  "Watermelon":["#d01c8b","#f1b6da","#f7f7f7","#b8e186","#4dac26"]
}

const CODE_TO_STATE = {
  "01":"AL","02":"AK","04":"AZ","05":"AR","06":"CA","08":"CO","09":"CT","10":"DE",
  "11":"DC","12":"FL","13":"GA","15":"HI","16":"ID","17":"IL","18":"IN","19":"IA",
  "20":"KS","21":"KY","22":"LA","23":"ME","24":"MD","25":"MA","26":"MI","27":"MN",
  "28":"MS","29":"MO","30":"MT","31":"NE","32":"NV","33":"NH","34":"NJ","35":"NM",
  "36":"NY","37":"NC","38":"ND","39":"OH","40":"OK","41":"OR","42":"PA","44":"RI",
  "45":"SC","46":"SD","47":"TN","48":"TX","49":"UT","50":"VT","51":"VA","53":"WA",
  "54":"WV","55":"WI","56":"WY","72":"PR"
}

const STATE_TO_NAME = {
  "AL":"Alabama","AK":"Alaska","AZ":"Arizona","AR":"Arkansas","CA":"California",
  "CO":"Colorado","CT":"Connecticut","DE":"Delaware","DC":"District of Columbia",
  "FL":"Florida","GA":"Georgia","HI":"Hawaii","ID":"Idaho","IL":"Illinois",
  "IN":"Indiana","IA":"Iowa","KS":"Kansas","KY":"Kentucky","LA":"Louisiana",
  "ME":"Maine","MD":"Maryland","MA":"Massachusetts","MI":"Michigan","MN":"Minnesota",
  "MS":"Mississippi","MO":"Missouri","MT":"Montana","NE":"Nebraska","NV":"Nevada",
  "NH":"New Hampshire","NJ":"New Jersey","NM":"New Mexico","NY":"New York",
  "NC":"North Carolina","ND":"North Dakota","OH":"Ohio","OK":"Oklahoma","OR":"Oregon",
  "PA":"Pennsylvania","RI":"Rhode Island","SC":"South Carolina","SD":"South Dakota",
  "TN":"Tennessee","TX":"Texas","UT":"Utah","VT":"Vermont","VA":"Virginia",
  "WA":"Washington","WV":"West Virginia","WI":"Wisconsin","WY":"Wyoming","PR":"Puerto Rico"
}
