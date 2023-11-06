module.exports = (sequelize, Sequelize) => {
    const Model = sequelize.define("model", {
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
    });

    return Model;
};