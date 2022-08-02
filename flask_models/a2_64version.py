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

from flask_cors import CORS

app = Flask(__name__)

CORS(app)

feature_vector_list = []
product_id_list = []

@app.route("/feature_vector_db", methods = ['GET','POST'])
def feature_vector_db():
	print("Before")

	feature_vector_list.clear()
	product_id_list.clear()

	data_raw = request.get_json(force = True)
	# data = list(data_raw)
	# print(type(data))
	data = data_raw['product_feature_data']
	for i in range(len(data)):
		featureVector = data[i]['featureVector']
		productId = data[i]['productId']
		feature_vector_list.append(featureVector)
		product_id_list.append(productId)
		print(len(feature_vector_list))

	print("Data Arrives",product_id_list)

	if len(product_id_list) > 0:
		return {'message_result': "good"}
	else:
		return {'message_result': "bad"}

@app.route("/extract_features", methods = ['GET','POST'])
def extract_features():
	print("Before")
	data = request.get_json(force = True)
	print("Data Arrives",data)
	data_values = list(data.values())
	product_id = data_values[0]
	image_directions = list(data_values[1].values())
	print(image_directions)
	image_path = image_directions[0]
	image_link = image_directions[1]
	
	model = ResNet50(weights='imagenet', include_top=False, input_shape=(64, 64, 3))

	def extract_features_func(img_path, model):
		print(img_path)
		input_shape = (64,64,3)
		regex = re.compile(
			r'^(?:http|ftp)s?://' # http:// or https://
			r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' #domain...
			r'localhost|' #localhost...
			r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or ip
			r'(?::\d+)?' # optional port
			r'(?:/?|[/?]\S+)$', re.IGNORECASE)

		# print(type(img_path),regex)
		if(re.match(regex,img_path)):
			img = IMG.open(BytesIO(requests.get(img_path).content))
			img = img.convert('RGB')
			img = img.resize((64,64), IMG.NEAREST)
			# with urllib.request.urlopen(img_path) as url:
			# 	img = image.load_img(BytesIO(url.read()), target_size=(input_shape[0], input_shape[1]))
		else:
			img = image.load_img(img_path, target_size=(input_shape[0], input_shape[1]))

		img_array = image.img_to_array(img)
		
		expanded_img_array = np.expand_dims(img_array, axis=0)
		preprocessed_img = preprocess_input(expanded_img_array)
		
		features = model.predict(preprocessed_img)
		
		flattened_features = features.flatten()
		normalized_features = flattened_features/norm(flattened_features)
		
		return normalized_features

	if image_link != '':
		features = extract_features_func(image_link, model)
	else:
		features = extract_features_func(image_path, model)
	feature_vector_list.append(features)
	product_id_list.append(product_id)

	return {"product_id" : product_id, "image_feature" : features.tolist()}

@app.route('/delete_product', methods = ['GET','POST'])
def delete_product():
	data = request.get_json(force = True)
	data_values = list(data.values())
	prod_id = data_values[0]

	val = -1
	for i in range(len(product_id_list)):
		if product_id_list[i] == prod_id:
			ind = i
			break
	
	product_id_list.pop(i)
	feature_vector_list.pop(i)

@app.route("/image_search", methods = ['GET','POST'])
def image_search():
	data = request.get_json(force = True)
	data_values = list(data.values())
	image_path = data_values[0]
	
	model = ResNet50(weights='imagenet', include_top=False, input_shape=(64, 64, 3))

	def extract_features_func(img_path, model):
		input_shape = (64,64,3)
		
		img = image.load_img(img_path, target_size=(input_shape[0], input_shape[1]))
		img_array = image.img_to_array(img)
		
		expanded_img_array = np.expand_dims(img_array, axis=0)
		preprocessed_img = preprocess_input(expanded_img_array)
		
		features = model.predict(preprocessed_img)
		
		flattened_features = features.flatten()
		normalized_features = flattened_features/norm(flattened_features)
		
		return normalized_features

	query_image_features = extract_features_func(image_path, model)
	print(len(feature_vector_list), len(feature_vector_list[0]))
	print(type(feature_vector_list), type(feature_vector_list[0]))
	neighbors = NearestNeighbors(n_neighbors = 2, algorithm='brute', metric='euclidean').fit(feature_vector_list)
	indices = neighbors.kneighbors([query_image_features])
	ind1 = list(indices)
	ind = list(ind1[1])
	# print(ind[0])
	result_product_id = []
	for i in range(2):
		result_product_id.append(product_id_list[ind[0][i]])
		# print(product_id_list[ind[0][i]])
	# print(product_id_list)
	return {"product_ids" : result_product_id}

if __name__ == "__main__":	
	app.run(port = 7064, debug = True)