module.exports = (sequelize, Sequelize) => {
    const carry = sequelize.define("carry", {
        article_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        purchase_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    }, { timestamps: false });
    return carry;
};