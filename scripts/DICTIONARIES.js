var CONCEPTS = [
  'TOTAL POPULATION',
  'URBAN AND RURAL',
  'HISPANIC OR LATINO ORIGIN',
  'RACE (TOTAL RACES TALLIED)',
  'RACE',
  'SEX BY AGE',
  'MEDIAN AGE BY SEX',
  'OCCUPANCY STATUS',
  'VACANCY STATUS',
  'POPULATION IN HOUSING UNITS BY TENURE',
  'GROUP QUARTERS POPULATION BY TYPE'
]

var TAG = {}

var VLbC = {}

var SOURCE_DICT = {
  'native':'nativelands',
  'nation':'nation',
  'state':'states',
  'county':'counties',
  'tract':'tracts',
  'group':'groups',
  'metroSA':'metroSA',
  'urban':'urban',
  'zip':'zip',
  'csub':'csub',
  'uschool':'uschool',
  'place':'place'
}

var LAYER_DICT = {
  //'native':'nativeland-fills',
  'nation':'nation-fills',
  'state':'state-fills',
  'county':'county-fills',
  'tract':'tract-fills',
  'group':'group-fills',
  'metroSA':'metroSA-fills',
  'urban' : 'urban-fills',
  'zip' : 'zip-fills',
  'csub':'csub-fills',
  'uschool':'uschool-fills',
  'place':'place-fills'
}
var LINELAYER_DICT = {
  //'native':'nativeland-lines',
  'nation':'nation-lines',
  'state':'state-lines',
  'county':'county-lines',
  'tract':'tract-lines',
  'group':'group-lines',
  'metroSA':'metroSA-lines',
  'urban' : 'urban-lines',
  'zip' : 'zip-lines',
  'csub':'csub-lines',
  'uschool':'uschool-lines',
  'place':'place-lines'
}

var SOURCELAYER_DICT = {
  'native':'indigenousNA-b3bdp4',
  'nation':'00US_nation10-19oe1f',
  'state':'00US_states10-dyd7cv',
  'county':'county10-26cu1b',
  'tract':'00US_tracts101-47boqk',
  'group':'00US_groups101-5zqy3o',
  'metroSA':'metroSA10-6188mc',
  'urban': 'urban10-czwsdr',
  'zip': '00US_zip10-cz976w',
  'csub':'csub10-d9p9q0',
  'uschool':'uschool10-bv8a78',
  'place':'place10-2f8z0e'
}


var SOURCE_TILESET_ID = {
  //'nativelands':'mapbox://samleblanc.11o9pqbw',
  'nation':'mapbox://samleblanc.5uf5jtni',
  'states':'mapbox://samleblanc.0p3v7xb5',
  'counties':'mapbox://samleblanc.9n3b0ly7',
  'tracts':'mapbox://samleblanc.9kelmyl5',
  'groups':'mapbox://samleblanc.6hr5or7z',
  'metroSA':'mapbox://samleblanc.7y3al5d9',
  'urban':'mapbox://samleblanc.8hnzdvf2',
  'zip':'mapbox://samleblanc.ai39xu4d',
  'csub':'mapbox://samleblanc.ds7axen5',
  'uschool':'mapbox://samleblanc.6v8clr3z',
  'place':'mapbox://samleblanc.3z4f5y9t',
}

COLOR_DICT = {
  'Red' : ['#FFFFFF','#FFC0C0','#FF8080','#FF4040','#FF0000'],
  'Blue' : ['#FFFFFF','#C0C0FF','#8080FF','#4040FF','#0000FF'],
  'Green' : ['#FFFFFF','#C0EAC0','#80D580','#40C040','#00AA00'],
  'Purple' : ['#FFFFFF','#EBC0FF','#D680FF','#C140FF','#AC00FF'],
  'Black' : ['#FFFFFF','#c0c0c0','#808080','#404040','#000000'],
  'Rainbow' : ['#3288BD','#ABDDA4','#F2EB92','#FDAE61','#D53E4F'],
  'Viridis' : ['#f9e721','#5ac865','#21908d','#3b1c8c','#450256'],
  'Viridis Light' : ['#FFFFD9','#DAF1B3','#7FCDBB','#2FA4C2','#225EA8'],
  'Greyscale' : ['#F0F0F0','#c3c3c3','#969696','#696969','#3c3c3c'],
  'Heat' : ['#FFFFFF','#FFFD0A','#FD9909','#FE4D05','#FF0000'],
  'Magma' : ['#fbffb2','#f7704f','#a72066','#370065','#000000'],
  'Brown-Teal' : ['#8C510A','#DFC27D','#DFE9D4','#80CDC1','#01665E'],
  'Blue-Red' : ['#2166AC','#92C5DE','#E7E0DC','#F4A582','#B2182B'],
}
