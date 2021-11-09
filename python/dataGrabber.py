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

def get_census20_api_data(code, geo, api_arr, summary):
    api_string = ','.join(map(str, api_arr))
    base_url = f'https://api.census.gov/data/{year}/dec/pl?get={api_string}';
    api_key = 'dd677280c5e9a6f9c1f6c4929fa378c2e3f1ebc5';
    key_extend = f'&key={api_key}'
    if geo == 'block':     url_extend = f'&for=block:*&in=state:{code}%20county:*%20tract:*';
    elif geo == 'group':   url_extend = f'&for=block%20group:*&in=state:{code}%20county:*%20tract:*';
    elif geo == 'county':  url_extend = f'&for=county:*';
    elif geo == 'tract':   url_extend = f'&for=tract:*&in=state:{code}';
    elif geo == 'state':   url_extend = f'&for=state:*';
    elif geo == 'region':  url_extend = f'&for=region:*';
    elif geo == 'division': url_extend = f'&for=division:*';
    elif geo == 'nation':  url_extend = f'&for=us:1';
    elif geo == 'metroSA': url_extend = f'&for=metropolitan%20statistical%20area/micropolitan%20statistical%20area:*';
    elif geo == 'aiannh': url_extend = f'&for=american indian area/alaska native area/hawaiian home land:*';
    elif geo == 'urban':   url_extend = f'&for=urban area:*';
    elif geo == 'zip':     url_extend = f'&for=zip code tabulation area:*';
    elif geo == 'csub':    url_extend = f'&for=county subdivision:*&in=state:{code}';
    elif geo == 'place':   url_extend = f'&for=place:*';
    elif geo == 'uschool': url_extend = f'&for=school district (unified):*';
    url = base_url + url_extend + key_extend
    data = requests.get(url).json();
    return data



def get_census10_api_data(code, geo, api_arr, summary):
    api_string = ','.join(map(str, api_arr))
    base_url = f'https://api.census.gov/data/{year}/dec/{summary}?get={api_string}';
    api_key = 'dd677280c5e9a6f9c1f6c4929fa378c2e3f1ebc5';
    key_extend = f'&key={api_key}'
    if geo == 'block':     url_extend = f'&for=block:*&in=state:{code}%20county:*%20tract:*';
    elif geo == 'group':   url_extend = f'&for=block%20group:*&in=state:{code}%20county:*%20tract:*';
    elif geo == 'county':  url_extend = f'&for=county:*';
    elif geo == 'tract':   url_extend = f'&for=tract:*&in=state:{code}';
    elif geo == 'state':   url_extend = f'&for=state:*';
    elif geo == 'region':  url_extend = f'&for=region:*';
    elif geo == 'division': url_extend = f'&for=division:*';
    elif geo == 'nation':  url_extend = f'&for=us:1';
    elif geo == 'metroSA': url_extend = f'&for=metropolitan%20statistical%20area/micropolitan%20statistical%20area:*';
    elif geo == 'aiannh': url_extend = f'&for=american indian area/alaska native area/hawaiian home land:*';
    elif geo == 'urban':   url_extend = f'&for=urban area:*';
    elif geo == 'zip':     url_extend = f'&for=zip code tabulation area:*';
    elif geo == 'csub':    url_extend = f'&for=county subdivision:*&in=state:{code}';
    elif geo == 'place':   url_extend = f'&for=place:*';
    elif geo == 'uschool': url_extend = f'&for=school district (unified):*';
    url = base_url + url_extend + key_extend
    data = requests.get(url).json();
    return data

def get_census00_api_data(code, geo, api_arr, summary):
    api_string = ','.join(map(str, api_arr))
    base_url = f'https://api.census.gov/data/{year}/dec/{summary}?get={api_string}';
    api_key = 'dd677280c5e9a6f9c1f6c4929fa378c2e3f1ebc5';
    key_extend = f'&key={api_key}'
    if geo == 'block':     url_extend = f'&for=block:*&in=state:{code}%20county:*%20tract:*';
    elif geo == 'group':   url_extend = f'&for=block%20group:*&in=state:{code}%20county:*%20tract:*';
    elif geo == 'county':  url_extend = f'&for=county:*';
    elif geo == 'tract':   url_extend = f'&for=tract:*&in=state:{code}';
    elif geo == 'state':   url_extend = f'&for=state:*';
    elif geo == 'region':  url_extend = f'&for=region:*';
    elif geo == 'division': url_extend = f'&for=division:*';
    elif geo == 'aiannh': url_extend = f'&for=american indian area/alaska native area/hawaiian home land:*';
    elif geo == 'nation':  url_extend = f'&for=us:1';
    elif geo == 'metroSA': url_extend = f'&for=consolidated%20metropolitan%20statistical%20area:*';
    elif geo == 'urban':   url_extend = f'&for=urban area:*';
    elif geo == 'zip':     url_extend = f'&for=zip code tabulation area:*';
    elif geo == 'csub':    url_extend = f'&for=county subdivision:*&in=state:{code}';
    elif geo == 'place':   url_extend = f'&for=place:*';
    elif geo == 'uschool': url_extend = f'&for=school district (unified):*';
    url = base_url + url_extend + key_extend;
    try :
        data = requests.get(url).json();
        return data
    except:
        print(f'NO DATA RETURNED. args: {code, geo, api_arr, summary}')
        print(url)
        return False

def api_data_to_dataframe(geo, api_arr, data):
    df = pd.DataFrame(data[1:], columns = data[0]);
    if year == "2020": df = getGEOID20(df,geo);
    if year == "2010": df = getGEOID10(df,geo);
    if year == "2000": df = getGEOID00(df,geo);
    df.set_index(f'GEOID{year[2:]}',inplace=True);
    df['SIZE'] = geo.upper();
    return df

def getGEOID20(df,geo):
    if geo == 'block':    df[f'GEOID{year[2:]}'] = df.state + df.county + df.tract + df.block;
    elif geo == 'group':  df[f'GEOID{year[2:]}'] = df.state + df.county + df.tract + df['block group'];
    elif geo == 'tract':  df[f'GEOID{year[2:]}'] = df.state + df.county + df.tract;
    elif geo == 'county': df[f'GEOID{year[2:]}'] = df.state + df.county;
    elif geo == 'state':  df[f'GEOID{year[2:]}'] = df.state;
    elif geo == 'region':  df[f'GEOID{year[2:]}'] = df.region;
    elif geo == 'division':df[f'GEOID{year[2:]}'] = df.division;
    elif geo == 'nation': df[f'GEOID{year[2:]}'] = '00';
    elif geo == 'aiannh':  df[f'GEOID{year[2:]}'] = df["american indian area/alaska native area/hawaiian home land"];
    elif geo == 'metroSA':df[f'GEOID{year[2:]}'] = df["metropolitan statistical area/micropolitan statistical area"];
    elif geo == 'urban':  df[f'GEOID{year[2:]}'] = df["urban area"];
    elif geo == 'zip':    df[f'GEOID{year[2:]}'] = df["zip code tabulation area"];
    elif geo == 'csub':   df[f'GEOID{year[2:]}'] = df.state + df.county + df["county subdivision"];
    elif geo == 'place':  df[f'GEOID{year[2:]}'] = df.state + df["place"];
    elif geo == 'uschool':df[f'GEOID{year[2:]}'] = df.state + df["school district (unified)"];
    return df

def getGEOID10(df,geo):
    if geo == 'block':    df[f'GEOID{year[2:]}'] = df.state + df.county + df.tract + df.block;
    elif geo == 'group':  df[f'GEOID{year[2:]}'] = df.state + df.county + df.tract + df['block group'];
    elif geo == 'tract':  df[f'GEOID{year[2:]}'] = df.state + df.county + df.tract;
    elif geo == 'county': df[f'GEOID{year[2:]}'] = df.state + df.county;
    elif geo == 'state':  df[f'GEOID{year[2:]}'] = df.state;
    elif geo == 'region':  df[f'GEOID{year[2:]}'] = df.region;
    elif geo == 'division':df[f'GEOID{year[2:]}'] = df.division;
    elif geo == 'nation': df[f'GEOID{year[2:]}'] = '00';
    elif geo == 'aiannh':  df[f'GEOID{year[2:]}'] = df["american indian area/alaska native area/hawaiian home land"];
    elif geo == 'metroSA':df[f'GEOID{year[2:]}'] = df["metropolitan statistical area/micropolitan statistical area"];
    elif geo == 'urban':  df[f'GEOID{year[2:]}'] = df["urban area"];
    elif geo == 'zip':    df[f'GEOID{year[2:]}'] = df["zip code tabulation area"];
    elif geo == 'csub':   df[f'GEOID{year[2:]}'] = df.state + df.county + df["county subdivision"];
    elif geo == 'place':  df[f'GEOID{year[2:]}'] = df.state + df["place"];
    elif geo == 'uschool':df[f'GEOID{year[2:]}'] = df.state + df["school district (unified)"];
    return df

def getGEOID00(df,geo):
    if geo == 'block':    df[f'GEOID{year[2:]}'] = df.state + df.county + df.tract + df.block;
    elif geo == 'group':  df[f'GEOID{year[2:]}'] = df.state + df.county + df.tract + df['block group'];
    elif geo == 'tract':  df[f'GEOID{year[2:]}'] = df.state + df.county + df.tract;
    elif geo == 'county': df[f'GEOID{year[2:]}'] = df.state + df.county;
    elif geo == 'state':  df[f'GEOID{year[2:]}'] = df.state;
    elif geo == 'region':  df[f'GEOID{year[2:]}'] = df.region;
    elif geo == 'division':  df[f'GEOID{year[2:]}'] = df.division;
    elif geo == 'aiannh':  df[f'GEOID{year[2:]}'] = df["american indian area/alaska native area/hawaiian home land"];
    elif geo == 'nation': df[f'GEOID{year[2:]}'] = '00';
    elif geo == 'metroSA':df[f'GEOID{year[2:]}'] = df["consolidated metropolitan statistical area"];
    elif geo == 'urban':  df[f'GEOID{year[2:]}'] = df["urban area"];
    elif geo == 'zip':    df[f'GEOID{year[2:]}'] = df["zip code tabulation area"];
    elif geo == 'csub':   df[f'GEOID{year[2:]}'] = df.state + df.county + df["county subdivision"];
    elif geo == 'place':  df[f'GEOID{year[2:]}'] = df.state + df["place"];
    elif geo == 'uschool':df[f'GEOID{year[2:]}'] = df.state + df["school district (unified)"];
    return df

def clean_data(code, df, geo, sub_hoard, summary):
    if year == "2020": api_data = get_census20_api_data(code,geo, sub_hoard, summary);
    if year == "2010": api_data = get_census10_api_data(code,geo, sub_hoard, summary);
    if year == "2000": api_data = get_census00_api_data(code,geo, sub_hoard, summary);
    if api_data:
        df1 = api_data_to_dataframe(geo, sub_hoard, api_data);
    else:
        df1 = pd.DataFrame();
    keep_cols = np.append(sub_hoard,[f'GEOID{year[2:]}','SIZE'])
    df1.drop(columns=[col for col in df1 if col not in keep_cols], inplace=True)
    df = pd.concat([df, df1],sort=True)
    return df

def combineCSVs():
    group_list = pd.read_csv(f'/home/samleblanc/{year}Variables.csv')['Group*'].unique()
    print(group_list)
    for group in group_list:
        for i in range(1,100):
            file_path = f"/home/samleblanc/{year[2:]}_{group}_{i}.csv"
            if path.exists(file_path):
                dfA = pd.read_csv(f"/home/samleblanc/{year[2:]}_{group}_0.csv",dtype={f'GEOID{year[2:]}': object})
                dfB = pd.read_csv(f"/home/samleblanc/{year[2:]}_{group}_{i}.csv",dtype={f'GEOID{year[2:]}': object})
                merged = pd.merge(dfA, dfB, on=f'GEOID{year[2:]}', how='outer')
                merged.drop(merged.filter(regex='_y$').columns.tolist(),axis=1, inplace=True)
                merged = merged.rename(columns={'SIZE_x':'SIZE'})
                # dfALL = dfALL.set_index(f'GEOID{year[2:]}').join(other.set_index(f'GEOID{year[2:]}'))
                # print(dfALL)
                merged.to_csv(index=False,path_or_buf=f"/home/samleblanc/{year[2:]}_{group}_x.csv");

year = "2020"
def main():
    # #national_geos = ["nation","state","metroSA","urban","zip","county","aiannh",'place','region','division','uschool'];
    # national_geos = ["nation","state","metroSA","county","aiannh",'place','region','division','uschool'];
    # state_geos = ['tract','csub','group'];
    # if year == "2000": national_geos.pop()
    # code = ""
    dfALL = pd.DataFrame();
    # group_list = pd.read_csv(f'/home/samleblanc/{year}Variables.csv')['Group*'].unique()
    # for group in group_list:
    #     dfVar = pd.read_csv(f'/home/samleblanc/{year}Variables.csv')
    #     gr = dfVar[dfVar["Group*"] == group];
    #     hoard = gr["Name"].values;
    #     summary = gr['Summary'].iloc[0];
    #     print(hoard)
    #     for i in range(1+len(hoard)//50):
    #         df = pd.DataFrame()
    #         sub_hoard = hoard[50*i : 50*(i+1)]
    #         for geo in national_geos:
    #             print(group,i,geo,)
    #             df = clean_data(code, df, geo, sub_hoard, summary)
    #         for code in code_to_state:
    #             code2 = code + code_to_state[code];
    #             for geo in state_geos:
    #                 print(group,i,geo,code)
    #                 if summary == 'sf3': break;
    #                 df = clean_data(code,df, geo, sub_hoard, summary)
    #         print(df)
    #         if len(hoard) > 50: suffix = f'_{i}'
    #         else: suffix = "";
    #         df.to_csv(index=True,path_or_buf="/home/samleblanc/" + f'{year[2:]}_'f'{group}{suffix}.csv');
    #         print(df.sort_values(by=[f'GEOID{year[2:]}']))
    combineCSVs()

if __name__ == "__main__":
    main()
