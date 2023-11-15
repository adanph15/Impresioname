const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        name: req.body.name,
        lastName: req.body.lastName,
        mail: req.body.mail,
        password: bcrypt.hashSync(req.body.password, 8),
    }).then(user => {
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({ message: "User registered successfully!" });
                });
            });
        } else {
            // user role = 1
            user.setRoles([1]).then(console.log('User register'));
        }
    }).catch(console.log('Error creating account'));
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            mail: req.body.mail
        }
    }).then(user => {
        if (!user) { console.log('User not found') }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        var authorities = [];
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                mail: user.mail,
                roles: authorities,
                accessToken: token
            });
        });
    }).catch(console.log('Cannot sing'));
};


exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then(data => {
            if (!data) { console.log(`Cannot find user with id: ${id}`); }
            res.send(data);
            return;
        }).catch(console.log('Cannot find user'));
};

exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) { console.log('User updated') }
        else { console.log('Cannot update user') }
    }).catch(console.log('Cannot update user'));
};