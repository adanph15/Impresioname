module.exports = (sequelize, Sequelize) => {
    const purchase = sequelize.define("purchase", {
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        total: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.STRING
        }
    }, { timestamps: false });

    return purchase;
};