import pickle

import pandas as pd
used_phones = pd.read_csv("FINAL_DATA.csv")


def cost(price):
  price = str(price)[:-3]
  price = str(price)[2:]
  price = str(price).replace(',',"")
  return int(price)

def brand(name):
  names = []
  names = str(name).split()
  return names[0]

def condition(status):
  if str(status) == "Unboxed - Like New":
    return 1
  elif str(status) == "Refurbished - Superb":
    return 2
  elif str(status) == "Refurbished - Good":
    return 3
  elif str(status) == "Refurbished - Okay":
    return 4

def values(name):
  value = {"Nokia" : 1, "lenovo" : 2, "SAMSUNG" : 3, "InFocus" : 4, "ViVO" : 5, "OPPO" : 6, "LG" : 7,"YU" : 8, "Panasonic" : 9, "APPLE" : 10, "Redmi" : 11, "Moto" : 12, "realme" : 13, "Honor" : 14,"Blackberry" : 15, "SONY" : 16, "OnePlus" : 17, "Google" : 18, "Mi" : 19, "Micromax" : 20,"Huawei" : 21, "HTC" : 22}
  if name in value.keys():
    return value[name]

def ram(ramm):
  if 'MB' in str(ramm):
    return int(str(ramm)[:-7])/1024
  elif 'GB' in str(ramm):
    return float(str(ramm)[:-7])
  else:
    return 3

def storage(value):
  if 'MB' in str(value):
    return int(str(value)[:-3])/1024
  elif 'GB' in str(value):
    return float(str(value)[:-3])
  else:
    if '32' in str(value):
      return 32
    else:
      return 64

used_phones['product_cost'] = used_phones['product_cost'].apply(cost)
used_phones['product_brand'] = used_phones['product_name'].apply(brand)
used_phones['product_condition'] = used_phones['product_condition'].apply(condition)
used_phones['product_brand'] = used_phones['product_brand'].apply(values)
used_phones['product_ram'] = used_phones['product_ram'].apply(ram)
used_phones['product_storage'] = used_phones['product_storage'].apply(storage)

used_phones = used_phones[['product_image','product_ram','product_condition','product_name','product_storage','product_color','original_cost','product_brand','product_cost']]
from sklearn import preprocessing
label_encoder = preprocessing.LabelEncoder()

used_phones['product_image']= label_encoder.fit_transform(used_phones['product_image'])
used_phones['product_name']= label_encoder.fit_transform(used_phones['product_name'])
used_phones['product_color']= label_encoder.fit_transform(used_phones['product_color'])

used_phones['product_storage'].unique()
# ram , storage

# used_phones = used_phones[['product_brand','product_condition','product_cost','original_cost']]
corr1 = used_phones.corr()
corr_heatmap1=corr1.loc[:,['product_cost']].sort_values(by='product_cost',ascending=False)*100 
corr_heatmap1=corr_heatmap1[corr_heatmap1['product_cost']>0]
corr_heatmap1

X = used_phones[['product_brand','product_condition','original_cost']]
Y = used_phones[['product_cost']]


from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.3, random_state=42)


from sklearn import linear_model
model = linear_model.Lasso(alpha=0.1)
model.fit(X_train,y_train)

preds = model.predict(X_test)

pickle.dump(model, open('model-ecommerce-lasso.pkl','wb'))

# Loading model to compare the results
model = pickle.load(open('model-ecommerce-lasso.pkl','rb'))