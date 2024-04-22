module.exports = (sequelize, Sequelize) => {
    const lenses = sequelize.define("lenses", {
        filename: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        article_id: {
            type: Sequelize.INTEGER
        }
    }, { timestamps: false });
    return lenses;
};