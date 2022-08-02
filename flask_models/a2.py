from flask import request, Flask
import numpy as np
from numpy.linalg import norm
from keras.preprocessing import image
from keras.applications.resnet50 import ResNet50, preprocess_input
from sklearn.neighbors import NearestNeighbors
from PIL import Image as IMG
import requests
import re
from io import BytesIO
import urllib
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# Lists to store feeature vectors and product id
feature_vector_list = []
product_id_list = []

# Connecting with MongoDB
client = MongoClient("mongodb+srv://ecommercedb:atharvarocks123@ecomm-cluster1.ryw5u.mongodb.net/Edb?retryWrites=true&w=majority")

print("STARTED Extracting data from DB")
db = client['Edb']
featureDB = db['imagesearches']
db_data_list = featureDB.find({},{'_id':0, 'featureVector':1, 'productId':1})

for i in db_data_list:
	feature_vector_list.append(i['featureVector'])
	product_id_list.append(str(i['productId']))

print(type(feature_vector_list[0]), type(product_id_list[0]))
print("COMPLETED Extracting data from DB")


@app.route("/")
def home():
    return "API is working fine"

@app.route("/extract_features", methods = ['GET','POST'])
def extract_features():
	print("Before")
	data = request.get_json(force = True)
	print("Data Arrives",data)
	data_values = list(data.values())
	product_id = data_values[0]
	image_link = data_values[1]
	
	model = ResNet50(weights='imagenet', include_top=False, input_shape=(128, 128, 3))

	def extract_features_func(img_path, model):
		print(img_path)
		input_shape = (128,128,3)

		img = IMG.open(BytesIO(requests.get(img_path).content))
		img = img.convert('RGB')
		img = img.resize((128,128), IMG.NEAREST)

		img_array = image.img_to_array(img)
		
		expanded_img_array = np.expand_dims(img_array, axis=0)
		preprocessed_img = preprocess_input(expanded_img_array)
		
		features = model.predict(preprocessed_img)
		
		flattened_features = features.flatten()
		normalized_features = flattened_features/norm(flattened_features)
		
		return normalized_features

	features = extract_features_func(image_link, model)
	print(len(features),product_id)
	feature_vector_list.append(features)
	product_id_list.append(product_id)

	return {"product_id" : product_id, "image_feature" : features.tolist()}

@app.route('/delete_product', methods = ['GET','POST'])
def delete_product():
	print(len(product_id_list))
	data = request.get_json(force = True)
	data_values = list(data.values())
	prod_id = data_values[0]
	print(prod_id, product_id_list[-1])
	print(type(prod_id), type(product_id_list[-1]))
	print(product_id_list)
	ind = -1
	for i in range(len(product_id_list)):
		if product_id_list[i] == prod_id:
			ind = i
			break

	print(ind, product_id_list[ind])
	if ind == -1:
		return {"message":"bad"}
	else:
		product_id_list.pop(ind)
		feature_vector_list.pop(ind)

		print(len(product_id_list))

		return {"message":"ok"}

@app.route("/image_search", methods = ['GET','POST'])
def image_search():
	data = request.get_json(force = True)
	data_values = list(data.values())
	print(type(data_values[0]))
	image_path = data_values[0]

	result_product_id = []
	# return {"product_ids" : result_product_id}
	
	model = ResNet50(weights='imagenet', include_top=False, input_shape=(128, 128, 3))

	def extract_features_image_search(img_path, model):
		print(img_path)
		input_shape = (128,128,3)

		img = IMG.open(BytesIO(requests.get(img_path).content))
		img = img.convert('RGB')
		img = img.resize((128,128), IMG.NEAREST)
		
		img_array = image.img_to_array(img)
		
		expanded_img_array = np.expand_dims(img_array, axis=0)
		preprocessed_img = preprocess_input(expanded_img_array)
		
		features = model.predict(preprocessed_img)
		
		flattened_features = features.flatten()
		normalized_features = flattened_features/norm(flattened_features)
		
		return normalized_features

	query_image_features = extract_features_image_search(image_path, model)
	
	neighbors = NearestNeighbors(n_neighbors = 5, algorithm='brute', metric='cosine').fit(feature_vector_list)
	
	indices = neighbors.kneighbors([query_image_features])
	ind1 = list(indices)
	ind = list(ind1[1])
	# print(ind[0])
	for i in range(5):
		result_product_id.append(product_id_list[ind[0][i]])
		# print(product_id_list[ind[0][i]])
	# print(product_id_list)
	return {"product_ids" : result_product_id}

if __name__ == "__main__":	
	app.run()
