module.exports = (sequelize, Sequelize) => {
    const direction = sequelize.define("direction", {
        direction: {
            type: Sequelize.STRING
        },
        post_code: {
            type: Sequelize.INTEGER
        },
        location: {
            type: Sequelize.STRING
        },
        province: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER
        }
    }, { timestamps: false });

    return direction;
};