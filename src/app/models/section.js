const sql = require("./db");

const Sections = (section) => {
    this.id = section.id;
    this.image = section.image;
    this.title = section.title;
    this.content = section.content;
};

Sections.getById = async (id) => {
    const query = "SELECT * FROM sections WHERE id = ?";
    try {
       const result = await sql.query(query,[id]);
       return result[0];
    } catch (error) {
        throw error;
    }
};

Sections.getSlide = async () => {
    const query = "SELECT * FROM sections LIMIT 0,3";
    try {
        const result = await sql.query(query);
        return result[0];
    } catch (error) {
        throw error;
        
    }
}

module.exports = Sections;