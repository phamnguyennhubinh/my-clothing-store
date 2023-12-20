const sql = require("./db.js");

const CartDetail = function (cartdetail) {
  this.cartID = cartdetail.cartID;
  this.productID = cartdetail.productID;
  this.quantity = cartdetail.quantity;
};

CartDetail.create = async (data) => {
    try {
        await sql.query("insert into cartdetails value (?,?,?)", [data.cartId, data.productId, data.quantity]);
        return data;
    } catch (err) {
        throw err;
    }
}

CartDetail.checkExistedItemInCart = async (data) => {
    try {
        const [existed] =  await sql.query("select quantity from cartdetails where cartID = ? AND productID = ?", [data.cartId, data.productId]);
        return existed;
    } catch (err) {
        throw err;
    }
}

CartDetail.getCartByCartId = async (cartID) => {
    const query = "select * from cartdetails where cartID = ?";
    try {
        const result = await sql.query(query, [cartID]);
        return result[0];
    } catch (error) {
        throw error;
    }
}

CartDetail.removeCartByProductId = async (data)=>{
    try {
        await sql.query("delete from cartdetails where cartID = ? AND productID = ?", [data.cartId, data.productId]);
        return 200;
    } catch (err) {
        throw err;
    }
};

CartDetail.removeWhenCartInCarts = async (customerID) => {
    try {
        const query = "DELETE FROM cartdetails WHERE cartID IN (SELECT cartID FROM customercart WHERE customerID = ?)";
        await sql.query(query,[customerID]);
    } catch (error) {
        console.log(error);
    }
};

CartDetail.updateItemInCart = async (cartId, productId, quantity) => {
    try {
        await sql.query("UPDATE cartdetails SET quantity = ? WHERE cartID = ? AND productID = ?", [quantity, cartId, productId]);
        return 200;
    } catch (err) {
        throw err;
    }
};

// CartDetail.getCustomerCartByCartId = async (cartID) => {
//     const query = "select * from cartdetails where cartID = ?";
//     try {
//         const result = await sql.query(query, [cartID]);
//         return result[0];
//     } catch (error) {
//         throw error;
//     }
// };


module.exports = CartDetail;
