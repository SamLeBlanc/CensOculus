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

topSheet = [

]

def get_census10_api_data(geo, api_arr):
    api_string = ','.join(map(str, api_arr))
    base_url = f'https://api.census.gov/data/2010/dec/sf1?get={api_string}';
    api_key = 'dd677280c5e9a6f9c1f6c4929fa378c2e3f1ebc5';
    key_extend = f'&key={api_key}'
    if geo == 'block':     url_extend = f'&for=block:*&in=state:{code}%20county:*%20tract:*';
    elif geo == 'group':   url_extend = f'&for=block%20group:*&in=state:{code}%20county:*%20tract:*';
    elif geo == 'county':  url_extend = f'&for=county:*';
    elif geo == 'tract':   url_extend = f'&for=tract:*&in=state:{code}';
    elif geo == 'state':   url_extend = f'&for=state:*';
    elif geo == 'nation':  url_extend = f'&for=us:1';
    elif geo == 'metroSA': url_extend = f'&for=metropolitan%20statistical%20area/micropolitan%20statistical%20area:*';
    elif geo == 'urban':   url_extend = f'&for=urban area:*';
    elif geo == 'zip':     url_extend = f'&for=zip code tabulation area:*';
    elif geo == 'csub':    url_extend = f'&for=county subdivision:*&in=state:{code}';
    elif geo == 'place':   url_extend = f'&for=place:*';
    elif geo == 'uschool': url_extend = f'&for=school district (unified):*';
    url = base_url + url_extend + key_extend
    data = requests.get(url).json();
    return data

def api_data_to_dataframe(geo, api_arr, data):
    df = pd.DataFrame(data[1:], columns = data[0]);
    df = getGEOID10(df,geo);
    df.set_index('GEOID10',inplace=True);
    df['SIZE'] = geo.upper();
    return df

def getGEOID10(df,geo):
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
    return df

def clean_data(df, geo, sub_hoard,):
    api_data = get_census10_api_data(geo, sub_hoard);
    df1 = api_data_to_dataframe(geo, sub_hoard, api_data);
    keep_cols = np.append(sub_hoard,['GEOID10','SIZE'])
    df1.drop(columns=[col for col in df1 if col not in keep_cols], inplace=True)
    df = pd.concat([df, df1],sort=True)
    return df

def combineCSVs():
    group_list = pd.read_csv(f'/home/sam/2010Variables.csv').Group.unique()
    for group in group_list:
        for i in range(1,100):
            file_path = f"/home/sam/{group}_{i}.csv"
            if path.exists(file_path):
                dfA = pd.read_csv(f"/home/sam/{group}_0.csv",dtype={"GEOID10": object})
                dfB = pd.read_csv(f"/home/sam/{group}_{i}.csv",dtype={"GEOID10": object})
                merged = pd.merge(dfA, dfB, on='GEOID10', how='outer')
                merged.drop(merged.filter(regex='_y$').columns.tolist(),axis=1, inplace=True)
                merged = merged.rename(columns={'SIZE_x':'SIZE'})
                merged.to_csv(index=False,path_or_buf="/home/sam/" + f'{group}_x.csv');

def main():
    group_list = pd.read_csv(f'/home/sam/2010Variables.csv').Group.unique()
    for group in group_list:
        dfVar = pd.read_csv(f'/home/sam/2010Variables.csv')
        hoard = dfVar[dfVar["Group"] == group]["Name"].values
        for i in range(1+len(hoard)//50):
            df = pd.DataFrame()
            sub_hoard = hoard[50*i : 50*(i+1)]
            for geo in ["nation","state","metroSA","urban","zip","county",'uschool','place']:
                print(group,i,geo,)
                df = clean_data(df, geo, sub_hoard)
            for code in code_to_state:
                code2 = code + code_to_state[code];
                for geo in ['tract','group','csub']:
                    print(group,i,geo,code)
                    df = clean_data(df, geo, sub_hoard)
            print(df)
            df.to_csv(index=True,path_or_buf="/home/sam/" + f'{group}_{i}.csv');
            print(df.sort_values(by=['GEOID10']))
    combineCSVs()

if __name__ == "__main__":
    main()
