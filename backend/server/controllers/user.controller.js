const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const utils = require("../auth/utils");
const bcrypt = require('bcryptjs');
const Direction = db.direction;

// Create and Save a new User
exports.create = async (req, res) => {
  try {

    const existingUser = await User.findOne({ where: { username: req.body.username } });
    if (existingUser) {
      return res.status(409).send({
        message: "Username already exists!"
      });
    }

    const hashedPassword = bcrypt.hashSync(req.body.password);

    let user = {
      username: req.body.username,
      name: req.body.name,
      last_name: req.body.last_name,
      mail: req.body.mail,
      password: hashedPassword,
      role: "user",
    };

    const createdUser = await User.create(user);

    const token = utils.generateToken(createdUser);

    const userObj = utils.getCleanUser(createdUser);

    res.json({ user: userObj, access_token: token });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  };
};

// Create and Save a new User
exports.createAdmin = (req, res) => {
  if (!req.body.password || !req.body.username) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  let user = {
    password: req.body.password,
    name: req.body.name,
    username: req.body.username,
    last_name: req.body.last_name,
    mail: req.body.mail,
    role: "admin",
  };

  User.findOne({ where: { username: user.username } })
    .then(data => {
      if (data) {
        const result = bcrypt.compareSync(user.password, data.password);
        if (!result) return res.status(401).send('Password not valid!');
        const token = utils.generateToken(data);
        const userObj = utils.getCleanUser(data);
        return res.json({ user: userObj, access_token: token });
      }

      user.password = bcrypt.hashSync(req.body.password);

      // User not found. Save new User in the database
      User.create(user)
        .then(data => {
          const token = utils.generateToken(data);
          // get basic user details
          const userObj = utils.getCleanUser(data);
          // return the token along with user details
          return res.json({ user: userObj, access_token: token });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Admin."
          });
        });

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });

};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id,{attributes: {exclude: ['password']}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.status(400).send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// // Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.status(400).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Find user by username and password
exports.findUserByUsernameAndPassword = (req, res) => {
  const user = req.body.username;
  const pwd = req.body.password;

  User.findOne({ where: { username: user, password: pwd } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.getUserDirections = (req, res) => {
  const userId = req.params.id;

  Direction.findAll({
    where: { user_id: userId }
  })
    .then(directions => {
      if (!directions) {
        res.status(400).send({ message: "Error finding Directions" });
      } else {
        res.status(300).send(directions);
      }
    })
    .catch(error => {
      res.status(500).send('Internal Server Error');
    });
};