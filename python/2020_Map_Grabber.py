from PyQt5.QtCore import *
from qgis.utils import iface
from qgis.core import ( QgsVectorLayer )
from os import path
from datetime import datetime
import requests, zipfile, io


folder_path = f'/home/sam/Census-Mapper-Data/'

code_to_state = {
  '01':'AL' , '02':'AK' , '04':'AZ' , '05':'AR' , '06':'CA' , '08':'CO' , '09':'CT' , '10':'DE' , '11':'DC' , '12':'FL' ,
  '13':'GA' , '15':'HI' , '16':'ID' , '17':'IL' , '18':'IN' , '19':'IA' , '20':'KS' , '21':'KY' , '22':'LA' , '23':'ME' ,
  '24':'MD' , '25':'MA' , '26':'MI' , '27':'MN' , '28':'MS' , '29':'MO' , '30':'MT' , '31':'NE' , '32':'NV' , '33':'NH' ,
  '34':'NJ' , '35':'NM' , '36':'NY' , '37':'NC' , '38':'ND' , '39':'OH' , '40':'OK' , '41':'OR' , '42':'PA' , '44':'RI' ,
  '45':'SC' , '46':'SD' , '47':'TN' , '48':'TX' , '49':'UT' , '50':'VT' , '51':'VA' , '53':'WA' , '54':'WV' , '55':'WI' ,
  '56':'WY' , '72':'PR'
}

code_to_state_name = {
  '01':'Alabama' , '02':'Alaska' , '04':'Arizona' , '05':'Arkansas' , '06':'California' , '08':'Colorado' , '09':'Connecticut' , '10':'Delaware' , '11':'District_of_Columbia' , '12':'Florida' ,
  '13':'Georgia' , '15':'Hawaii' , '16':'Idaho' , '17':'Illinois' , '18':'Indiana' , '19':'Iowa' , '20':'Kansas' , '21':'Kentucky' , '22':'Louisiana' , '23':'Maine' ,
  '24':'Maryland' , '25':'Massachusetts' , '26':'Michigan' , '27':'Minnesota' , '28':'Mississippi' , '29':'Missouri' , '30':'Montana' , '31':'Nebraska' , '32':'Nevada' , '33':'New_Hampshire' ,
  '34':'New_Jersey' , '35':'New_Mexico' , '36':'New_York' , '37':'North_Carolina' , '38':'North_Dakota' , '39':'Ohio' , '40':'Oklahoma' , '41':'Oregon' , '42':'Pennsylvania' , '44':'Rhode_Island' ,
  '45':'South_Carolina' , '46':'South_Dakota' , '47':'Tennessee' , '48':'Texas' , '49':'Utah' , '50':'Vermont' , '51':'Virginia' , '53':'Washington' , '54':'West_Virginia' , '55':'Wisconsin' ,
  '56':'Wyoming' , '72':'Puerto_Rico'
}

state_level_geography_dict = {
    #'tract20'   :'tract20',
    # 'bg'         :'group20',
    #'cousub20'  :'csub20',
    #'place20'   :'place20',
    #'unsd20'    :'uschool20',
}

nation_level_geography_dict = {
    #'state20'   :'state20',
    'county'   :'county20',
    #'cbsa20'    :'metroSA20',
    #'uac20'     :'urban20',
    #'zcta520'   :'zip20',
}

# Downloads and unzips Census shapefiles from official TIGER directories
# If the file name already exists, the method will skip download to save time
# census_geography_keys are key,value pairs containing the "Census terminology" and "Sam's terminology" for each geography
# Currently downloading the block, group, tract, and county files (the directory only has CDs for 108th and 111th Congress...dumb)
# Example url for Alaska block file --> https://www2.census.gov/geo/pvs/tiger2010st/02_Alaska/02/tl_2010_02_tabblock10.zip
def download_state_level_census_files(code):
    for web_name, my_file_name in state_level_geography_dict.items():
        file_path = folder_path + f'{code2}_{my_file_name}.shp';
        if not path.exists(file_path):
            current_time = datetime.now().strftime("%H:%M");
            print(f'Downloading Census File: {web_name}  State:{code}  Start Time:{current_time}');
            download_path = f'https://www2.census.gov/geo/tiger/TIGER2020/{web_name.upper()}/tl_2020_{code}_{web_name}.zip';
            response = requests.get(download_path);
            z = zipfile.ZipFile(io.BytesIO(response.content));
            z.extractall(folder_path);

def download_nation_level_census_files():
    for web_name, my_file_name in nation_level_geography_dict.items():
        file_path = folder_path + f'{my_file_name}.shp';
        if not path.exists(file_path):
            current_time = datetime.now().strftime("%H:%M");
            print(f'Downloading Census File: {web_name} Start Time:{current_time}');
            download_path = f'https://www2.census.gov/geo/tiger/TIGER2020/{web_name.upper()}/tl_2020_us_{web_name}.zip';
            response = requests.get(download_path);
            z = zipfile.ZipFile(io.BytesIO(response.content));
            z.extractall(folder_path);

# Renames the downloaded Census files from download_census_files, using same census_geography_keys as before
# Files are renamed to shorter titles (blocks10, group10, tract10, countys10)
# Since shapefiles need 5 files to work (?) we must rename each file type in a loop
def rename_state_level_census_files(code):
    for web_name, my_file_name in state_level_geography_dict.items():
        old_path = folder_path + '/tl_2020_' + code + '_' + web_name;
        new_path = folder_path + code2 + '_' + my_file_name;
        file_endings = ['.shp','.prj','.shx','.dbf','.shp.xml'];
        for type in file_endings:
            if path.exists(old_path+type):
                os.rename(old_path+type, new_path+type);

def rename_nation_level_census_files():
    for web_name, my_file_name in nation_level_geography_dict.items():
        old_path = folder_path + '/tl_2020_us_' + web_name;
        new_path = folder_path + my_file_name;
        file_endings = ['.shp','.prj','.shx','.dbf','.shp.xml'];
        for type in file_endings:
            if path.exists(old_path+type):
                os.rename(old_path+type, new_path+type);

def open_nation_level_census_files():
    for k in nation_level_geography_dict.values():
        open_Vector_Layer_From_File(folder_path + k + '.shp', k);

def open_state_level_census_files(code):
    for k in state_level_geography_dict.values():
        open_Vector_Layer_From_File(folder_path + code2 + '_' + k + '.shp', code2 + '_' + k);

# Opens vector layer in QGIS from file path, includes parameter for new_layer_name
def open_Vector_Layer_From_File(input_file_path, new_layer_name):
    vlayer = QgsVectorLayer(input_file_path, new_layer_name, 'ogr');
    if not vlayer.isValid():
        print('Layer failed to load:', new_layer_name);
    else:
        QgsProject.instance().addMapLayer(vlayer);

def delete_fields(layer):
  L = [l for l in layer.fields().names() if l not in ['GEOID','NAME','ALAND']]
  for f in L:
    index = layer.fields().indexFromName(f);
    res = layer.dataProvider().deleteAttributes([index]);
    layer.updateFields();

# Removes all the layers, duh...
def remove_all_layers():
    layers = QgsProject.instance().mapLayers().values();
    for layer in layers: QgsProject.instance().removeMapLayer(layer);

download_nation_level_census_files()
rename_nation_level_census_files()
open_nation_level_census_files()
# STATE_LAYER = QgsProject.instance().mapLayersByName('state10')[0]
COUNTY_LAYER = QgsProject.instance().mapLayersByName('county20')[0]
# METROSA_LAYER = QgsProject.instance().mapLayersByName('metroSA10')[0]
# URBAN_LAYER = QgsProject.instance().mapLayersByName('urban10')[0]
# ZIP_LAYER = QgsProject.instance().mapLayersByName('zip10')[0]
# delete_fields(STATE_LAYER)
delete_fields(COUNTY_LAYER)
# delete_fields(METROSA_LAYER)
# delete_fields(URBAN_LAYER)
# delete_fields(ZIP_LAYER)
remove_all_layers()

for code in code_to_state:
    code2 = code + code_to_state[code]
    print(code2)
    download_state_level_census_files(code)
    rename_state_level_census_files(code)
    open_state_level_census_files(code)
    #TRACT_LAYER = QgsProject.instance().mapLayersByName(code2 + '_tract10')[0]
    #GROUP_LAYER = QgsProject.instance().mapLayersByName(code2 + '_group20')[0]
    #CSUB_LAYER = QgsProject.instance().mapLayersByName(code2 + '_csub10')[0]
    #PLACE_LAYER = QgsProject.instance().mapLayersByName(code2 + '_place10')[0]
    #USCHOOL_LAYER = QgsProject.instance().mapLayersByName(code2 + '_uschool10')[0]
    #delete_fields(TRACT_LAYER)
    #delete_fields(GROUP_LAYER)
    #delete_fields(CSUB_LAYER)
    #delete_fields(PLACE_LAYER)
    #delete_fields(USCHOOL_LAYER)
    #remove_all_layers()
