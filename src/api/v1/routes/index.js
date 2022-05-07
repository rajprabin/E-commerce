const order = require("./order");
const cart = require("./cart");
const product = require("./product");
const user = require("./user");
const auth = require("./auth");
const error = require("../../../middlewares/v1/errorhandler");

module.exports = (app)=>{
    app.use("/api/order", order);
    app.use("/api/cart", cart);
    app.use("/api/product", product);
    app.use("/api/user", user);
    app.use("/api/auth", auth);
    app.use(error);
    
}

