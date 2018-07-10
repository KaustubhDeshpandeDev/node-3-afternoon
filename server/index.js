const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();

const checkForSession = require("./middleware/checkForSession");

const app = express(); //this is where we are creating the express application
//controllers
const swag_controller = require("./controllers/swag_controller");
const auth_controller = require("./controllers/auth_controller");
const cart_controller = require("./controllers/cart_controller");
const search_controller = require("./controllers/search_controller");

//now we are going to add the middleware to the app
app.use(bodyParser.json);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

//this is us making out own middleware

app.use(checkForSession);

//lets get the swag now
app.get("/api/swag", swag_controller.read);

//endpoints for authentication

app.post("/api/login", auth_controller.login);
app.post("/api/register", auth_controller.register);
app.post("/api/signout", auth_controller.signout);
app.get("/api/user", auth_controller.getUser);

//endpoints for cart
app.post("/api/cart", cart_controller.add);
app.post("/api/cart/checkout", cart_controller.checkout);
app.delete("/api/cart", cart_controller.delete);

//endpoints for search

app.get("/api/search", search_controller.search);

// now we make it listen on the port 3000

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listening on port ${port}.`);
});
