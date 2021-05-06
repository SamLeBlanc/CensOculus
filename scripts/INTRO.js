function holder(){
  $('#intro-text').text('');
  $('#next-1').css('opacity', '0');
  map.setLayoutProperty('nativeland-fills','visibility','none');
  Structure()
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fade() {
  for (let i = 0; i < 100 ; i++) {
    await sleep(10);
    map.setPaintProperty('nativeland-fills', 'fill-opacity', i*.001);
  }
}

async function Intro() {
  $('#intro-title').text('');
  $('#intro-text').text('');
  await sleep(500);
  $('#intro-title').append("<t> Welcome to the 2020 U.S. Census Viewer! </t><br>");
  $('#intro-title').append("Created using <a href='https://www.mapbox.com/'>Mapbox</a> and the results of the <a href='https://en.wikipedia.org/wiki/2020_United_States_census'>2020 United States Census.</a><br>");

  landA = `<st1>LAND ACKNOWLEDGEMENT</st1><br> For more than 130,000 years, humans and their ancestors have lived on the North American continent, creating a cultural history that is as vibrant as it is diverse. Ancestral historians estimate there may have been more than 20,000 unique tribes living in this region over the last 100,000 years.<br><br> Indigenous Americans lived predominantly in hunter-gatherer groups with loosely defined territory that was ever changing. The current map shows the territory of many of the tribes that occupied this land during the last millennium. This data was graciously borrowed from <a href='https://native-land.ca/'>Native-Land.ca</a>, please visit and support their site to learn about the territory, languages and treaties of native peoples.<br><br> The United States and its Census have existed for a little less than 250 years, equal to just 0.2% of the time that humans have lived on this continent. To properly understand the context of the Census, it must be remembered that the United States was built on stolen land without the consent of native peoples. <br>`

  await sleep(2000);
  $('#intro-text').append(landA);
  await sleep(1000);
  $('#cur-view').text('Ancestral lands of indigenous North Americans during the last millennium')
  fade()
  await sleep(2000);
  $('#next-1').css('opacity', '1');
  for (i=0;i<6;i++){
    featureRandomColor(SOURCE_LIST[i], SOURCELAYER_LIST[i])
  }
}

async function Structure() {
  await sleep(500);
  struc = `<st1 style="color:purple">CENSUS GEOGRAPHY STRUCTURE</st1><br>Census data is organized into a geogrpahic heirarchy, with larger geographies defined as the sum of smaller ones. <br> In this way, the 2020 Census divided the United States into...`
  await sleep(1000);
  $('#intro-text').append(struc);
  S = [
    '1 Country',
    '50 States',
    '3233 Counties',
    '73,057 Census Tracts',
    '217,740 Block Groups',
    '11,078,297 Census Blocks'
  ]
  T = [
    'nation-fills',
    'state-fills',
    'county-fills',
    'tract-fills',
    'group-fills',
  ]
  await sleep(3000);

  for(i=0;i<6;i++){
    $('#intro-text').append('<br><br>');
    $('#intro-text').append(`<f${i}><b>${S[i]}</b></f${i}>`);
    if (i == 3){
      await(4000)
      map.flyTo({
        center: [-77.03637, 38.89511 ],
        zoom: 10,
        speed: 0.5,
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
    }
    if (i < 5) {
      map.setLayoutProperty(T[i],'visibility','visible');
      for(ii=0;ii<5;ii++){
        if (ii != i) map.setLayoutProperty(T[ii],'visibility','none')
      }
    }
    await sleep(8000);
  }

}
