import pandas as pd
import os
from fuzzywuzzy import fuzz
from fuzzywuzzy import process


df_flags = pd.read_csv('flagData.csv', encoding= 'unicode_escape', dtype='object')
df_places = pd.read_csv('placeData.csv', dtype='object')

df_flags = df_flags[df_flags['Size'] == 'Place']
df_places = df_places[df_places['Size'] == 'place']

flags = df_flags.FULL.tolist()
places = df_places.FULL.tolist()

f = open('f.txt','w')

for flag in flags:
    str2Match = flag
    strOptions = places
    Ratios = process.extract(str2Match,strOptions)
    #print(Ratios)
    # You can also select the string with the highest matching percentage
    highest = process.extractOne(str2Match,strOptions)
    d = df_places[df_places.FULL == highest[0]]
    stringy = flag + '~~' + highest[0] + '~~' + d.loc[:,'GEOID10'].values[0]
    if highest[1] == 100:
        f.write(stringy)
        print(stringy)
    if highest[1] != 100:
        r = Ratios[0:10]
        listToStr = ' '.join([str(elem) for elem in r])
        f.write(stringy + listToStr)
        print(stringy + listToStr)
f.close()
