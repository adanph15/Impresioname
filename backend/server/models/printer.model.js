module.exports = (sequelize, Sequelize) => {
    const printer = sequelize.define("printer", {
        model: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        article_id: {
            type: Sequelize.INTEGER
        }
    }, { timestamps: false });
    return printer;
};