module.exports = (sequelize, Sequelize) => {
    const article = sequelize.define("article", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.JSON,
            defaultValue: {}
        },
        category: {
            type: Sequelize.STRING
        },
        stock: {
            type: Sequelize.INTEGER
        },
        filename: {
            type: Sequelize.STRING
        }
    }, { timestamps: false });
    return article;
};