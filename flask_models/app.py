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
    datalist=list(data.values())
    print("Val in PREDICT ",data,datalist)
    for i in range(len(datalist)):
        datalist[i]=int(datalist[i])
        
    
    prediction = model.predict([np.array(datalist)])

    output = int(round(prediction[0]))
   
    return jsonify(output)

if __name__ == "__main__":
    app.run(debug=True, port=8000)