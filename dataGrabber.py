import requests
import pandas as pd
import numpy as np
from os import path


code_to_state = {
  '01':'AL' , '02':'AK' , '04':'AZ' , '05':'AR' , '06':'CA' , '08':'CO' , '09':'CT' , '10':'DE' , '11':'DC' , '12':'FL' ,
  '13':'GA' , '15':'HI' , '16':'ID' , '17':'IL' , '18':'IN' , '19':'IA' , '20':'KS' , '21':'KY' , '22':'LA' , '23':'ME' ,
  '24':'MD' , '25':'MA' , '26':'MI' , '27':'MN' , '28':'MS' , '29':'MO' , '30':'MT' , '31':'NE' , '32':'NV' , '33':'NH' ,
  '34':'NJ' , '35':'NM' , '36':'NY' , '37':'NC' , '38':'ND' , '39':'OH' , '40':'OK' , '41':'OR' , '42':'PA' , '44':'RI' ,
  '45':'SC' , '46':'SD' , '47':'TN' , '48':'TX' , '49':'UT' , '50':'VT' , '51':'VA' , '53':'WA' , '54':'WV' , '55':'WI' ,
  '56':'WY' , '72':'PR'
}

def get_census10_api_data(geo,api_arr):
    api_key = 'dd677280c5e9a6f9c1f6c4929fa378c2e3f1ebc5';
    api_string = ','.join(map(str, api_arr))
    base_url = f'https://api.census.gov/data/2010/dec/sf1';
    if geo == 'block':
        url = f'{base_url}?get={api_string}&for=block:*&in=state:{code}%20county:*%20tract:*&key={api_key}';
    elif geo == 'group':
        url = f'{base_url}?get={api_string}&for=block%20group:*&in=state:{code}%20county:*%20tract:*&key={api_key}';
    elif geo == 'county':
        url = f'{base_url}?get={api_string}&for=county:*&key={api_key}';
    elif geo == 'tract':
        url = f'{base_url}?get={api_string}&for=tract:*&in=state:{code}&key={api_key}';
    elif geo == 'state':
        url = f'{base_url}?get={api_string}&for=state:*&key={api_key}';
    elif geo == 'nation':
        url = f'{base_url}?get={api_string}&for=us:1&key={api_key}';
    elif geo == 'metroSA':
        url = f'{base_url}?get={api_string}&for=metropolitan%20statistical%20area/micropolitan%20statistical%20area:*&key={api_key}';
    elif geo == 'urban':
        url = f'{base_url}?get={api_string}&for=urban area:*&key={api_key}';
    elif geo == 'zip':
        url = f'{base_url}?get={api_string}&for=zip code tabulation area:*&key={api_key}';
    elif geo == 'csub':
        url = f'{base_url}?get={api_string}&for=county subdivision:*&in=state:{code}&key={api_key}';
    elif geo == 'place':
        url = f'{base_url}?get={api_string}&for=place:*&key={api_key}';
    elif geo == 'uschool':
        url = f'{base_url}?get={api_string}&for=school district (unified):*&key={api_key}';
    data = requests.get(url).json();
    return data

def api_data_to_dataframe(geo, api_arr, data):
    df = pd.DataFrame(data[1:], columns=data[0]);
    if geo == 'block':
        df['GEOID10'] = df.state + df.county + df.tract + df.block;
    elif geo == 'group':
        df['GEOID10'] = df.state + df.county + df.tract + df['block group'];
    elif geo == 'tract':
        df['GEOID10'] = df.state + df.county + df.tract;
    elif geo == 'county':
        df['GEOID10'] = df.state + df.county;
    elif geo == 'state':
        df['GEOID10'] = df.state;
    elif geo == 'nation':
        df['GEOID10'] = '00';
    elif geo == 'metroSA':
        df['GEOID10'] = df["metropolitan statistical area/micropolitan statistical area"];
    elif geo == 'urban':
        df['GEOID10'] = df["urban area"];
    elif geo == 'zip':
        df['GEOID10'] = df["zip code tabulation area"];
    elif geo == 'csub':
        df['GEOID10'] = df.state + df.county + df["county subdivision"];
    elif geo == 'place':
        df['GEOID10'] = df.state + df["place"];
    elif geo == 'uschool':
        df['GEOID10'] = df.state + df["school district (unified)"];
    df.set_index('GEOID10',inplace=True);
    df['SIZE'] = geo.upper()
    return df

def clean_data(df, geo, sub_hoard,):
    api_data = get_census10_api_data(geo, sub_hoard);
    df1 = api_data_to_dataframe(geo, sub_hoard, api_data);
    keep_cols = np.append(sub_hoard,['GEOID10','SIZE'])
    df1.drop(columns=[col for col in df1 if col not in keep_cols], inplace=True)
    df = pd.concat([df, df1],sort=True)
    return df

group_list = [ "P11", "P12", "P13", "P14", "P15", "P16", "P17", "P18", "P19", "P20", "P21", "P22", "P23", "P24", "P25", "P26", "P27", "P28", "P29", "P30", "P31", "P32", "P33", "P34", "P35", "P36", "P37", "P38", "P39", "P40", "P41", "P42", "P43", "P44", "P45", "P46", "P47", "P48", "P49", "P50", "P51",  ]
for group in group_list:
    df69 = pd.read_csv(f'/home/sam/2010Variables.csv')
    hoard = df69[df69["Group"] == group]["Name"].values
    print(hoard)
    for sub_H in range(1+len(hoard)//50):
        df = pd.DataFrame()
        sub_hoard = hoard[50*sub_H : 50*(sub_H + 1)]
        for geo in ["nation","state","metroSA","urban","zip","county",'uschool','place']:
            print(group,sub_H,geo,)
            df = clean_data(df, geo, sub_hoard)
        for code in code_to_state:
            code2 = code + code_to_state[code];
            for geo in ['tract','group','csub']:
                print(group,sub_H,geo,code)
                df = clean_data(df, geo, sub_hoard)
        print(df)
        df.to_csv(index=True,path_or_buf="/home/sam/" + f'{group}_{sub_H}.csv');
        print(df.sort_values(by=['GEOID10']))

for group in group_list:
    for i in range(1,10):
        file_path = f"/home/sam/{group}_{i}.csv"
        if path.exists(file_path):
            dfA = pd.read_csv(f"/home/sam/{group}_0.csv",dtype={"GEOID10": object})
            dfB = pd.read_csv(f"/home/sam/{group}_{i}.csv",dtype={"GEOID10": object})
            print(dfA, dfB)
            output1 = pd.merge(dfA, dfB, on='GEOID10', how='outer')
            output1.drop(output1.filter(regex='_y$').columns.tolist(),axis=1, inplace=True)
            output1 = output1.rename(columns={'SIZE_x':'SIZE'})
            print(output1)
            print(output1.columns)
            output1.to_csv(index=False,path_or_buf="/home/sam/" + f'{group}_x.csv');
