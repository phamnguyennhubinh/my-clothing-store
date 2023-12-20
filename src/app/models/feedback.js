const sql = require("./db");

const Feedbacks = (feedback) => {
    this.id = feedback.id;
    this.name = feedback.name;
    this.note = feedback.note;
    this.content = feedback.content;
};

Feedbacks.getFb = async () => {
    const query = "SELECT * FROM feedbacks";
    try {
        const result = await sql.query(query);
        return result[0];
    } catch (error) {
        throw error;
    };
};

Feedbacks.getById = async (id) => {
    const query = "SELECT * FROM feedbacks WHERE id = ?";
    try {
        const result = await sql.query(query, [id]);
        return result[0];
    } catch (error) {
        throw error;
    }
}

module.exports = Feedbacks;