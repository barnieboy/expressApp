# expressApp

============================ABOUT THE APPLICATION==========================
it is an application where user can register himself and after login he can see all the products and can search them.

=======================TECHNOLOGIES USED==================================

expressjs nodejs :- for creating the api's and the backend services
handlebars :- for server side templating
html css :- for UI
passportJS :- for authentication and session management
ORM :- for mysql database orm
bcrypt :- for encrypting user password

=============================== UI PAGES ========================================

LOGIN :- user can login using email and password.
SIGNUP :- user can register himself into application by providing him details.
DASHBOARD :- after sucessfully login dashboard page will be open with listing of all the products in product table 		there is a search widget at well to search the product based on search text. and it is also having a 			logout button to logout from the application


==========================About the application architecture (MVC)=========================
There are following directory and files:-

app.js :-   it is the entry point of the application it is having basic setting and the server setup and also having the 		  middleware.
package.json :-  it is having details of all the node modules we have installed
config >> db.js :- this file is having database related configurations
config >> passport.js :- it is having configuration related to passport user authentication
routes >> auth.routes.js :- it is having all the routes related to authentication (login/logout) from where we are calling 			associate controllers handlers which will handle the specific route request and response
routes >> dashboard.routes.js :- it is having all the routes related to dashboard (dashboard listing/search) from where we 				are calling associate controllers handlers which will handle the specific route request 				and response
routes >> users.routes.js :- it is having all the routes related to users (create user) from where we are calling 				associate controllers handlers which will handle the specific route request and response

models >> user.model.js :-    it is having object(model) of user
models >> product.model.js :- it is having object(model) of product


controllers >> auth.controller.js :- having handler method to handle authentication (login /logout) it is where our 					business logic is.
controllers >> user.controller.js :- having handler method to handle user model (create a user) it is where our business 				logic is.
controllers >> dashboard.controller.js :- having handler method to handle dashboard(listing of products , search) it is 					where our business  logic is.

views >> layouts >> main.handlebars :- it is the main handlebars which is the root layout having basic html skelton
views >> login.handlebars :- having login page html css and handlebar code
views >> register.handlebars :- having register page html css and handlebar code
views >> dashboard.handlebars :- having dashboard page html css and handlebar code
views >> unauthorised.handlebars :- having page to handle unauthorised requests


public >> it is having images and css we are using in our applications   ========================SCREENSHOTS================================================= 



REGISTER PAGE  



LOGIN PAGE







DASHBOARD PAGE




SEARCH PRODUCT

  

NO PRODUCTS PAGE 
 



PROJECT ARCHITECHTURE




