import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()

from flask_cors import CORS


app = Flask(__name__)
model = pickle.load(open('model-ecommerce-lasso.pkl', 'rb'))
import sys
print("SYS HERE ",sys.path)


CORS(app)


@app.route('/predict_api',methods=['POST'])
def predict_api():
    '''
    For direct API calls trought request
    '''
    data = request.get_json(force=True)
    rizuList=list(data.values())
    print("Val in PREDICT ",data,rizuList)
    for i in range(len(rizuList)):
        rizuList[i]=int(rizuList[i])
        
    
    prediction = model.predict([np.array(rizuList)])

    output = int(round(prediction[0]))
   
    return jsonify(output)

if __name__ == "__main__":
    app.run(debug=True, port=8000)