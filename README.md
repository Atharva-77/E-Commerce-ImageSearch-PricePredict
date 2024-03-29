# [E-Commerce Website With ImageSearch & PricePredict](https://e-commerce-stores.vercel.app/)
This is website in **MERN(MongoDB, Express, Reactjs, Nodejs)**:- https://e-commerce-stores.vercel.app/ .   
**Flask framework** used for image search, price prediction.   
(See last line for image search, price prediction)

You can **Add/Remove items from Basket**, **Write Product review**.   
**Unique Feature** (which isn't on most e-commerce sites):- User(buyer) can **Upload an image of product** and the website shows similar products to the user. 
Seller also have option to **Predict Price of a product** that the seller intends to resell.

Buyers can **Fill shipping address and Place orders** too.   
**Paypal Payment gateway** has been integrated for buyers.   


## Features:-
1. Add/Remove items to a basket   
2. Write Product review   
3. Image Search Feature. **Unique Feature** (which isn't on  most e-commerce sites) 
4. Predict Price of a Product for seller  **Unique Feature** (which isn't on  most e-commerce sites)   
5. Paypal Payment gateway integrated.
6. Separate screen for sellers to track products.   
7. Separate screen for Admins to track products,delete users,etc..   

## Techstack:-  
**MERN(MongoDB Express, Reactjs, Nodejs)** Stack is used to build the website.

Frontend is made in **Reactjs**. **Redux** is used to fetch most of the data from Backend.   
Backend is made in **Nodejs, express** and **Mongodb** is the database used.   

**Firebase** is used to images of Product.
**Flask framework** used for image search, price prediction.

For Image search, **resnet-50** model used.
For Price prediction, **lasso-regression** model used.   

**Unfortunately** you cannot access Machine learning parts(Image search, Price Prediction) as they take a lot of space, hence they couldn't be deployed/ hosted in the free tier of heroku or other such websites. But you can download the file and run on local machine.

----------------------------------------------------------------------------------------------------------------------------
### <ins>For Image Search</ins>:-

At the header(search bar), click on the downarrow besides the camera logo(as shown below)   

**Step 1**   
![Downarrow besides Camera icon near top-Search bar](https://user-images.githubusercontent.com/41574777/182393248-0f765ede-ee49-4768-9755-3c7386b5bbbb.jpg)

**Upload the picture as shown below.   
Step2**   
![Upload picture](https://user-images.githubusercontent.com/41574777/182393237-17726f35-8d3b-4050-afdc-aa43c2a80e9a.png)



## How to run project locally?:- 
1. Go to ```backend``` directory
2. Do ```npm run install```. Server gets started.
3. Come out of ```backend``` directory. i.e. come in same level where src folder is.
4. Do ```npm run install```. Frontend gets started.
5. In ```backend/config_folder``` create ```config.env```
6. In ```config.env``` file, put:-   
&ensp;&ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp; &ensp;&ensp; &ensp;&ensp; &ensp;   a. PORT &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp; &ensp;(Port number where server is to be run)   
&ensp;&ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp; &ensp;&ensp; &ensp;&ensp; &ensp;   b. MONGO_URI        &ensp; &ensp; &ensp;&ensp; &ensp; &ensp;&ensp;&ensp;  (MongoDb url of database to connect)   
&ensp;&ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp; &ensp;&ensp; &ensp;&ensp; &ensp;   c. JWT_SECRET_TOKEN &ensp; &ensp; &ensp;  (Can put any string as the token)   
&ensp;&ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp;&ensp; &ensp;&ensp;&ensp; &ensp;&ensp; &ensp;&ensp; &ensp;   d. PAYPAL_CLIENTID  &ensp;&ensp;&ensp; &ensp; &ensp;  (Paypal client id)
