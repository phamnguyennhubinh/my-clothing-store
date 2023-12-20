const sql = require("./db");

const Products = (product) => {
    this.productID = product.productID;
    this.categoryID = product.categoryID;
    this.supplierID = product.supplierID;
    this.productName = product.productName;
    this.price = product.price;
    this.quantity = product.quantity;
    this.description = product.description;
};

Products.getList = async () => {
    const query = "SELECT * FROM products";
    try {
        const result = await sql.query(query);
        return result[0];
    } catch (error) {
        throw error;
    }
};

Products.getById = async (productID) => {
    const query = "SELECT productID AS id, productName AS name, price, quantity from products  WHERE productID = ?";
    try {
        const arr =  await sql.query(query,[productID]);
        return arr[0];
    } catch (error) {
        throw error;
    }
};

Products.getProductByPage = async (perPage,page) => {
    let p = 0;
    if(page != 1)
    {
        p = Number((page-1)*perPage);
    }
    const query = "SELECT productID AS id, productName AS name, price, quantity FROM products LIMIT ?,?";
    try {
        const list = await sql.query(query, [p, Number(perPage)]);
        return list[0];
    } catch (error) {
        throw error;
    }
};

Products.getImageByProductId = async (productID) => {
    const query = "select imageUrl from imageproduct where productID = ?";
    let array = [];
    try{
        const result = await sql.query(query,[productID]);
        for(let i = 0; i<result[0].length; i++) {
            array.push(result[0][i].imageUrl);
        }
        return array;
    } catch (error) {
        throw error;
    }
};

module.exports = Products;