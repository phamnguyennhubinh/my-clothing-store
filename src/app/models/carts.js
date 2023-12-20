const sql = require("./db.js");

const Cart = function(cart) {
    this.cartID = cart.cartID;
    this.customerID = cart.customerID;
};

Cart.create = async (customerId) => {
    try {
        const [cart] = await sql.query("INSERT INTO customercart SET customerID = ?", [customerId]);
        const insertedCartId = cart.insertId;
        return { cartID: insertedCartId };
    } catch (err) {
        throw err;
    }
}

Cart.remove = async (customerId) => {
    try {
        await sql.query("delete from customercart where customerID = ?", [customerId]);
        return 200;
    }
    catch (err) {
        throw err;
    }
    
}

Cart.getCartId = async (customerId) => {
    let cartId = await sql.query("select cartID from customercart where customerID = ?", [customerId])
    console.log(cartId[0][0]?.cartID);
    return cartId[0][0]?.cartID;
}

Cart.checkExistedCartId = async (cartId) => {
    let [existed] = await sql.query("select * from customercart where cartID = ?",[cartId]);
    return existed?.length > 0;
}

module.exports = Cart;