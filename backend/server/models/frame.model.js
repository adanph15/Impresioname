module.exports = (sequelize, Sequelize) => {
    const frame = sequelize.define("frame", {
        filename: {
            type: Sequelize.STRING
        },
        color: {
            type: Sequelize.STRING
        },
        article_id: {
            type: Sequelize.INTEGER
        }
    }, { timestamps: false });
    return frame;
};