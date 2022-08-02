# [E-Commerce Website With ImageSearch & PricePredict](https://buytes.herokuapp.com/)
This is website in **MERN(MongoDB Express, Reactjs, Nodejs)**:- https://buytes.herokuapp.com/
Flask framework used for image search, price prediction.

You can **Add/Remove items from Basket**, **Write Product review**.   
**Unique Feature** (which isn't on most e-commerce sites):- User(buyer) can **Upload an image of product** and the website shows similar products to the user. 
Seller also have option to **Predict Price of a product** that he/she intends to resell.

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
