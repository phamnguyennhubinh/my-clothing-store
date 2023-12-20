
const sql = require("./db");

const Setting = (setting) => {
    this.id = setting.id;
    this.name = setting.name;
    this.title = setting.title;
    this.content = setting.content;
};

Setting.getSetting = async (name) => {
    const query = "SELECT * FROM Setting WHERE name = ?";
    try {
        const result = await sql.query(query, [name]);
        return result[0];
    } catch (error) {
        throw error;
    };
};


module.exports = Setting;