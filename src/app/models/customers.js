const sql = require("./db");
const { comparePasswords } = require("../utils/customerFunc");

const Customers = function (customer) {
  this.customerID = customer.customerID;
  this.name = customer.name;
  this.phone = customer.phone;
  this.email = customer.email;
  this.birthday = customer.birthday;
  this.hashed_password = customer.hashed_password;
  this.salt = customer.salt;
};

Customers.getAllCustomer = async function () {
  return await sql.query("SELECT * FROM customers");
};

Customers.getCustomerById = async function (id) {
  return await sql.query(
    `SELECT * FROM customers WHERE customerID = ${id}`
  );
};

Customers.login = async (username, password) => {
  console.log("This is username: ",username)
  console.log("This is password: ",password)
  let res = await sql
    .query(
      "SELECT customerID, hashed_password FROM customers WHERE phone = ?",
      [username]
    );
  if (res[0][0]?.customerID !== undefined) {
    const hashed_pass = res[0][0]?.hashed_password;

    const isMatch = await comparePasswords(password, hashed_pass);

      if (isMatch) {
        console.log(200);
        console.log(res[0][0]?.customerID);
        return res[0][0]?.customerID;
      } else {
        console.log("Là: 403");
        return 403;
      }
  } else {
    console.log(401);
    return 401;
  }
};

Customers.getInfoDeliveryAndCartById = async function (id) {
  let arr = []; 
  console.log("id la: ",id);
  let res = await sql
    .query("select * from infodelivery where customerID = ?", [id]);
  if(res[0] != null)
  {
    arr.push(res[0]); 
  console.log(res[0]);
  let cartId = await sql
    .query("select cartID from customercart where customerID = ?", [id]);
  let cartDetails = await sql
    .query("select * from cartdetails where cartID = ?", [cartId[0][0]?.cartID]);
  console.log("CartId: ",[cartId[0][0]?.cartID]);
  console.log(cartDetails[0]);
    arr.push(cartDetails[0]);
  }
  
  console.log("Đây là arr: ", arr);
  return arr;
};

Customers.create = async function (data) {
  const [customer] = await sql.query("INSERT INTO customers SET ?", [data])
  const customerId = customer.insertId;
  return {id: customerId, ...data};
};

Customers.checkRegister = async (phone) => {
  let res = await sql
    .query("SELECT * FROM customers WHERE `phone` = ?", [phone]);
  console.log("resCheckRegister: ", res[0]);
  return res[0]?.length;
};

Customers.findIdByPhone = async (phone) => {
  let [res] = await sql
    .query("SELECT customerID FROM customers WHERE `phone` = ?", [phone]);
  console.log("its: ",res)
  console.log("resFindByID: ", res[0].customerID);
  return res[0]?.customerID;
};

Customers.remove = async function (id) {
  try {
    await sql.query(
      "DELETE FROM customers WHERE customerID = ?", [id]);
      return 200;
  } catch (error) {
    throw error;
  };
};

Customers.update = async function (b) {
 await sql.query(
    "UPDATE customers SET name = ?, phone = ?, email = ?, birthday = ?, hashed_password = ? WHERE customerID = ?",
    [
      b.name,
      b.phone,
      b.email,
      b.birthday,
      b.hashed_password,
      b.customerID,
    ]);
    return b;
};

module.exports = Customers;
