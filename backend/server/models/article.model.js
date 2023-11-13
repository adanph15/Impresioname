module.exports = (sequelize, Sequelize) => {
    const article = sequelize.define("article", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.FLOAT
        },
        category: {
            type: Sequelize.STRING
        },
        stock: {
            type: Sequelize.BOOLEAN
        }
    }, { timestamps: false });
    return article;
};