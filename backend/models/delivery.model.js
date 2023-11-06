module.exports = (sequelize, Sequelize) => {
    const Delivery = sequelize.define("delivery", {
        date: {
            date: Sequelize.DATE
        },
        total: {
            total: Sequelize.FLOAT
        },
        status: {
            type: Sequelize.STRING
        }
    });

    return Delivery;
};