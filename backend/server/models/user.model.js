module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        mail: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    }, { timestamps: false });
    return user;
};

// ADD USERNAME