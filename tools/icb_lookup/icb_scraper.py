import requests
from bs4 import BeautifulSoup
import pandas as pd
from io import StringIO
import json
import os 

# scrap page
icb_page_url = 'https://www.sbs.nhs.uk/supplier-information/ccg-icb-list/'
page_content = requests.get(icb_page_url)
page_html = BeautifulSoup(page_content.text, 'html.parser')

# read specific part of html (icb table) into dataframe
# if page structure ever includes multiple tables this will need to be revisted (see .find_all)
table = page_html.find('table')
df = pd.read_html(StringIO(str(table)))[0]

# convert dataframe in specific json-ready structure
#//TODO - fix Series.__getitem__ treating keys as positions is deprecated. In a future version, integer keys will always be treated as labels (consistent with DataFrame behavior). To access a value by position, use `ser.iloc[pos]`
output = {}
for _, row in df.iterrows():
    output[row['CCG Entity Code'][0]] =\
    {
        "ICB Code": row['ICB Entity Code'][0],
        "ICB Name": row['ICB New Name'][0],
        "CCG": row['CCG\u2019S'][0]
    }

# save dict as json
dir_path = os.path.dirname(os.path.realpath(__file__))
# hardcoded path for now
with open(dir_path+"/ccg_to_icb.json", "w") as json_output_directory: 
    json.dump(output, json_output_directory)
