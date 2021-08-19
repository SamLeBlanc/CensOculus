const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let currentTourSlide = 0;

const moveTourWithArrow = e => {
  if (e.which == 39 && currentTourSlide) {
    currentTourSlide++;
    takeTour(currentTourSlide);
  }
  else if (e.which == 37 && currentTourSlide > 1) {
    currentTourSlide--;
    takeTour(currentTourSlide);
  }
}

document.addEventListener('keydown', moveTourWithArrow);

const takeTour = async(n) => {
  closeTour();
  closeAllNavs();
  $('#tour-window').css('left','420px').css('top','10px');

  if (n == 1) tour1()
  if (n == 2) tour2()
  if (n == 3) tour3()
  if (n == 4) tour4()
  if (n == 5) tour5()
  if (n == 6) tour6()
  if (n == 7) tour7()
  if (n == 8) tour8()
  if (n == 9) tour9()
  if (n == 10) tour10()
};

const closeTour = () => {
  $('#tour-window').css('left','500px').css('top','-1000px');
  currentTourSlide = 0;
}

const tour1 = async() => {
  currentTourSlide = 1;
  full52View();
  SETTINGS["Geo"] = 'state';
  SETTINGS["Realm"] = 'Total';
  await updateRealm()
  SETTINGS["Concept"] = 'P1';
  distributeSettings();
  updateConcept();
  $('#tour-text').html(
        `<div>
          <span style="font-size:1.4em">Welcome to the United States of America!</span>
        </div>
        <div>
          <span style="font-size:1.0em; font-weight:600; color:#666;">Home of baseball, apple pie, and 22% of the world's incarcerated population.</span>
        </div>
        <div style="padding-top:7px;">
          <span class="tour-text-style">
            Every ten years, the United States conducts a Census to count its population.<br>
            In 2010, the U.S. population was <span style="font-size:1.25em; color:darkblue">308,745,528</span> people <span style="color:#666">(~4% of the world total)</span>.
          </span>
        </div>
        <div style="padding-top:8px;">
          <span class="tour-text-style">
            <span style="color:#551a8b"><b>CensOculus</b></span> is a tool for visualizing these Census results, let's see how it works!
          </span>
        </div>
        <div style="padding-top:8px;">
          <span class="tour-text-style">
            The current map shows the <b>population in each of the 50 states</b> (plus DC and PR) <br>
            Try <span style="color:darkgreen"><b>hovering</b></span> over a state to view its population.
          </span>
        </div>
        <div style="padding-top:8px;">
          <span class="tour-text-style">
            Or try <span style="color:#C71585"><b>clicking</b></span> on a state to learn a bit more about it!
          </span>
        </div>
        <div style="padding-top:8px;">
          <span class="tour-text-style">
            You can also <span style="color:#dd5f30"><b>select multiple states</b></span> at once to learn about a larger area. First, click on the
            &nbsp<img src="images/plus.png" width="15" height="15" style="position: relative;">&nbsp
            button on the left. Then, select as many states as you want!
          </span>
        </div>
        <div>
          <img src="images/x.png" width="20" height="20" style="position: absolute; top:12px; left:560px;" onclick="closeTour();">
        </div>
        <div style="padding-top:6px; position: relative; left:253px;">
          <span style="color:#666"><i>Click or use the arrow keys to continue</i></span>
          &nbsp&nbsp
          <img src="images/arrow-right.png" height="16" style="position: relative; top: 3px;" onclick="tour2()">
        </div>`
)}

const tour2 = async() => {
  currentTourSlide = 2;
  $('#tour-text').html(
      `      <div>
              <span style="font-size:1.4em">Basic Map Settings</span>
            </div>
            <div style="padding-top:4px;">
              <span class="tour-text-style">
                While the founding principle of the Census was a simple population count,<br> today the Census Bureau collects
                <span style="color:#2E8B57"><b>data in dozens of categories</b></span>.<br>
                <div style="padding-top:5px;"></div>
                For the next decade, private buisnesses and governments alike will use this data to
                <span style="color:#483d8b"><b>place hospitals, </b></span>
                <span style="color:#800000"><b>distribute services, </b></span>
                <span style="color:#800080"><b>analyze the economy, </b></span>
                and much more.
              </span>
              <div style="padding-top:4px;">
                To view data other than population, click the
                <span style="font-size:1.2em; color:#22222"><b>
                <img src="images/gear.png" width="24" height="24" style="position: relative; top:5px;"> Settings
                </b></span>button on the left.
              </div>
              <div style="padding-top:2px;">
                <span class="tour-text-style">
                  Under <b>Data Selection</b>, you'll find controls to change what data is being mapped.
                  <div style="padding-top:6px;"></div>
                  You can adjust the
                  <span style="color:#dd6000"><b>Year</b></span>
                  to see the results from previous censuses (2000, 2010).
                  <div style="padding-top:6px;">
                  Or try changing the
                  <span style="color:#dd6000"><b>Geography</b></span>
                  to view other ways of partioning the country.
                  <div style="padding-top:1px;"></div>
                  <span style="color:#666"><i>For smaller geographies, make sure you are zoomed in enough to load the map.</i></span>
                </span>
              </div>
              <div style="padding-top:6px;">
                <span class="tour-text-style">
                  By selecting the
                  <span style="color:#dd6000"><b>Realm</b></span>,
                  you can choose what general data category to map, this includes things like Race, Ethnicity, Age, Sex, Housing, etc.
                </span>
              </div>
              <div style="padding-top:6px;">
                <span class="tour-text-style">
                  The
                  <span style="color:#dd6000"><b>Concept</b></span>
                  is a sub-category of Realm, and below Concept is the
                  <span style="color:#dd6000"><b>Variable</b></span>.
                </span>
              </div>
              <div style="padding-top:8px;">
                <span class="tour-text-style">
                  Try adjusting these settings yourself, or click the arrow to see an example...
                </span>
              </div>
                <img src="images/x.png" width="20" height="20" style="position: absolute; top:12px; left:560px;" onclick="closeTour();">
              </div>
              <div style="padding-top:6px;">
                <img src="images/arrow-left.png" height="16" style="position: relative;" onclick="tour1()">
                <img src="images/arrow-right.png" height="16" style="position: relative; left:510px;" onclick="tour3()">
              </div>
            </div>`
)}

const tour3 = async() => {
  lower48View();
  $('#tour-text').html(`<div>
    <span style="font-size:1.4em">Example:&nbsp<b>Black Population Percentage by State</b></span><br>
    <div style='font-weight:600; color:#666;'>
      Maps can take several seconds to load, just wait for the
      &nbsp
      <div id='loading-3' class="loader" style="display: inline-block; position: relative; top: 4px; left: 0px; border: 5px solid #f3f3f3; border-top: 5px solid #be66d1; width: 11px; height: 11px;"></div>
      &nbsp
      icon to go away
    </div>
  </div>
  <div style="padding-top:6px;">
    <span class="tour-text-style">
      The current map (once loaded) shows the percentage of residents in each state who self identify their race as
      <span style="color:#864313"><b>Black or African American</b></span>.
    </span>
  </div>
  <div style="padding-top:6px;">
    <span class="tour-text-style">
      The <b>demographic effects of slavery</b> are still clearly visible in the South today.
    </span>
  </div>
  <div style="padding-top:8px;">
    <span class="tour-text-style">
      <span style="color:#C71585"><b>Clicking</b></span> on a state will now show you data for other races as well.
    </span>
  </div>
  </div>
    <img src="images/x.png" width="20" height="20" style="position: absolute; top:12px; left:560px;" onclick="closeTour();">
  </div>
  <div style="padding-top:6px;">
    <img src="images/arrow-left.png" height="16" style="position: relative;" onclick="tour2()">
    <img src="images/arrow-right.png" height="16" style="position: relative; left:510px;" onclick="tour4()">
  </div>
  </div>`)
  currentTourSlide = 3;
  SETTINGS["Geo"] = 'state';
  SETTINGS["Realm"] = 'Race';
  await updateRealm()
  SETTINGS["Concept"] = 'P6';
  distributeSettings();
  await updateConcept();
  SETTINGS["Variable"] = 'P006003P';
  distributeSettings();
  update();
}

const tour4 = async() => {
  currentTourSlide = 4;
  SETTINGS["Geo"] = 'county';
  distributeSettings();
  update();

  $('#tour-text').html(`
  <div>
    <span style="font-size:1.4em">Example:&nbsp<b>Black Population Percentage by County</b></span>
  </div>
  <div style="padding-top:4px;">
    <span class="tour-text-style">
      It is important to realize that <span style="color:purple"><b>states are not mono-demographic</b></span>.
      Each state is home to a complex mix of peoples, cultures, and communities.
      To understand the demographics of a large area, we must often consider it in smaller pieces.
      <div style="padding-top:8px;"></div>
      By viewing <span style="color:darkgreen"><b>counties, rather than states</b></span>, we can now see the South's
      <a href="https://en.wikipedia.org/wiki/Black_Belt_in_the_American_South" target="_blank" style="font-weight:700">Black Belt</a>.
      This region of highly fertile soil was coveted by White plantation owners who bought
      <a href="https://en.wikipedia.org/wiki/Slavery_in_the_United_States" target="_blank" style="color:#8b0000; font-weight:800;">slaves by the millions</a>
      to work the cotton and tobacco fields.
    </span>
  </div>
  </div>
    <img src="images/x.png" width="20" height="20" style="position: absolute; top:12px; left:560px;" onclick="closeTour();">
  </div>
  <div style="padding-top:6px;">
    <img src="images/arrow-left.png" height="16" style="position: relative;" onclick="tour3()">
    <img src="images/arrow-right.png" height="16" style="position: relative; left:510px;" onclick="tour5()">
  </div>
`)
}

const tour5 = async() => {
  currentTourSlide = 5;
  SETTINGS["Geo"] = 'tract';
  distributeSettings();
  update();
  blackBeltView();

  $('#tour-text').html(`
  <div>
    <span style="font-size:1.4em">Example:&nbsp<b>Black Population Percentage by Tract</b> </span>
  </div>
  <div style="padding-top:4px;">
    <span class="tour-text-style">
      Smaller than counties, <span style="color:#6c1478"><b>Census Tracts</b></span> provide a detailed view of the Black Belt.
      Here are some of the only rural areas in the country with a Black racial majority.
      <div style="padding-top:8px;"></div>
      Demographic maps are powerful because they are also
      <span style="color:#A16F0A"><b>maps of history</b></span>.
      <div style="padding-top:8px;"></div>
      This map alone shows many residual effects from
      <a href="https://en.wikipedia.org/wiki/Slavery_in_the_United_States" target="_blank">slavery</a>,
      <a href="https://en.wikipedia.org/wiki/Reconstruction_era" target="_blank">the Reconstruction</a>,
      <a href="https://en.wikipedia.org/wiki/Great_Migration_(African_American)" target="_blank">the Great Migration</a>,
      <a href="https://en.wikipedia.org/wiki/Black_flight" target="_blank">Black flight</a>,
      <a href="https://en.wikipedia.org/wiki/West_Indian_Americans" target="_blank">Caribbean immigration</a>, and much more.
      <div style="padding-top:8px;"></div>
      By changing the <span style="color:#dd6000"><b>Geography</b></span>, new insights can be made about the data that would have been otherwise impossible.
      There area many different geography options to choose from under:&nbsp
      <img src="images/gear.png" width="15" height="15" style="position: relative; top:2px;">
      <span style="font-size:1.0em; font-weight:600; color:#555;">Settings > Data Selection > Geography</span>
    </span>
  </div>
  </div>
    <img src="images/x.png" width="20" height="20" style="position: absolute; top:12px; left:560px;" onclick="closeTour();">
  </div>
  <div style="padding-top:6px;">
    <img src="images/arrow-left.png" height="16" style="position: relative;" onclick="tour4()">
    <img src="images/arrow-right.png" height="16" style="position: relative; left:510px;" onclick="tour6()">
  </div>
`)
}

const tour6 = async() => {
  currentTourSlide = 6;

  $('#tour-text').html(`
  <div>
    <span style="font-size:1.4em">More on Data Selection</span>
  </div>
  <div style="padding-top:4px;">
    <span class="tour-text-style">
      So far, we have changed the geography of the map, <b>but not the data itself</b>.<br>
      To map something other than race, go to
      <img src="images/gear.png" width="15" height="15" style="position: relative; top:2px;">
      <span style="font-size:1.0em; font-weight:600; color:#555;">Settings > Data Selection > Realm</span>
      <div style="padding-top:8px;"></div>
      The <span style="color:#dd6000; font-size:1.1em;"><b>Realm</b></span> is the most broad category of data classification.
      With the Realm, you can select what <span style="color:#437bba"><b>general topic</b></span> you are interested in.
      The Realm determines what Concepts and Variables are available, so be sure to select the Realm first.
      <div style="padding-top:8px;"></div>
      Next, you can select the <span style="color:#dd6000; font-size:1.1em;"><b>Concept</b></span>.
      These are narrower in scope than Realms, as each Concept points to a <span style="color:#437bba"><b>specific topic</b></span>, rather than a broad one.
      <div style="padding-top:2px;"></div>
      <span style="color:#666"><i>Due to crossover topics, the same Concept may appear under multiple Realms.</i></span>
      <div style="padding-top:8px;"></div>
      Last to be selected is the <span style="color:#dd6000"; font-size:1.1em;><b>Variable</b></span>; the specific value of the Concept that
      will be applied to the map. Variables represent the <span style="color:#437bba"><b>actual tablulated Census values</b></span>, and their percentages.
      In all, the Census counts almost 10,000 variables!
    </span>
  </div>
  </div>
    <img src="images/x.png" width="20" height="20" style="position: absolute; top:12px; left:560px;" onclick="closeTour();">
  </div>
  <div style="padding-top:6px;">
    <img src="images/arrow-left.png" height="16" style="position: relative;" onclick="tour5()">
    <img src="images/arrow-right.png" height="16" style="position: relative; left:510px;" onclick="tour7()">
  </div>
`)
}

const tour7 = async() => {
  currentTourSlide = 7;
  $('#tour-text').html(`
  <div>
    <span style="font-size:1.4em">Example:&nbsp<b>% Hispanic Population in L.A. by Tract</b></span>
  </div>
  <div>
    <span class="tour-text-style">
      <div style='padding-top:5px;'>
        Next, we see the percentage of the population with Hispanic ethnicity, mapped by Census Tract.
        To get here, we adjusted the <b>Data Selection</b> settings with: <br>
        <div style='padding-top:6px;'></div>
        &nbsp&nbsp&nbsp&nbsp&nbsp•&nbsp&nbsp
        <span style="color:#dd6000"><b>Realm</b></span> > Ethnicity <br>
        <div style='padding-top:3px;'></div>
        &nbsp&nbsp&nbsp&nbsp&nbsp•&nbsp&nbsp
        <span style="color:#dd6000"><b>Concept</b></span> > Hispanic and Lation Origin <br>
        <div style='padding-top:3px;'></div>
        &nbsp&nbsp&nbsp&nbsp&nbsp•&nbsp&nbsp
        <span style="color:#dd6000"><b>Variable</b></span> > % Hispanic and Latino <br>
      </div>
      <div style='padding-top:5px;'>
        Since the options per category change depending on the other selections,
        it is important to <b>
        <span style="color:#2c599d">pick Realm first,</span>
        <span style="color:#4860cf">then Concept,</span> </b>and<b>
        <span style="color:#7973f6">finally Variable</b></span>.
      </div>
    </span>
  </div>
  </div>
    <img src="images/x.png" width="20" height="20" style="position: absolute; top:12px; left:560px;" onclick="closeTour();">
  </div>
  <div style="padding-top:6px;">
    <img src="images/arrow-left.png" height="16" style="position: relative;" onclick="tour6()">
    <img src="images/arrow-right.png" height="16" style="position: relative; left:510px;" onclick="tour8()">
  </div>
`)
  LA_View()
  SETTINGS["Geo"] = 'state';
  SETTINGS["Realm"] = 'Ethnicity';
  await updateRealm()
  SETTINGS["Concept"] = 'P4';
  distributeSettings();
  await updateConcept();
  SETTINGS["Geo"] = 'tract';
  SETTINGS["Variable"] = 'P004003P';
  distributeSettings();
  update();
}

const tour8 = async() => {
  currentTourSlide = 8;
  $('#tour-text').html(`
  <div>
    <span style="font-size:1.4em">More Tour Coming Soon</span>
  </div>
  <div style="padding-top:4px;">
    <span class="tour-text-style">

    </span>
  </div>
  </div>
    <img src="images/x.png" width="20" height="20" style="position: absolute; top:12px; left:560px;" onclick="closeTour();">
  </div>
  <div style="padding-top:6px;">
    <img src="images/arrow-left.png" height="16" style="position: relative;" onclick="tour7()">
  </div>
`)
}