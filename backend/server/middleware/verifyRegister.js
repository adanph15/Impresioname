const db = require("../models");
const Roles = db.ROLES;
const User = db.user;

// Next to pass next verification
mailVerification = (req, res, next) => {
    User.findOne({
        where: { mail: req.body.mail }
    }).then(user => {
        if (user) { console.log('User alredy exist') }
        next();
    });
};


rolVerification = (req, res, next) => {
    if (req.body.roles) {
        for (let t = 0; t < req.body.roles.length; t++) {
            if (!Roles.includes(req.body.roles[t])) { console.log("Rol doesn't exist") }
        }
    }
    next();
};

const verifyRegister = {
    mailVerification: mailVerification,
    rolVerification: rolVerification
};

module.exports = verifyRegister;