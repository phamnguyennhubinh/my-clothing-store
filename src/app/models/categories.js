const sql = require("./db.js");

const Categories = function (category) {
  this.categoryID = category.categoryID;
  this.categoryName = category.categoryName;
  this.description = category.description;
};

Categories.getAll = async function () {
  return await sql.query("SELECT * FROM categories");
};

Categories.getById = async function (id) {
  return await sql.query(`SELECT * FROM categories WHERE categoryID = ${id}`);
};

Categories.create = async function (data) {
  const [cate] = await sql.query("INSERT INTO categories(categoryName,description) VALUE (?, ?)", [data.categoryName, data.description]);
  return {id: cate.insertId, ...data};
};

Categories.remove = async (id) => {
  await sql.query("DELETE FROM categories WHERE categoryID = ?", id);
};

Categories.update = async (b) => {
  await sql.query(
    "UPDATE categories SET categoryName = ?, description = ? WHERE categoryID = ?",
    [b.categoryName, b.description, b.categoryID]);
  return b;
};

module.exports = Categories;
