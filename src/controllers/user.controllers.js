const catchError = require('../utils/catchError');
const User = require('../models/User');

//get all users
const getAll = catchError(async(req, res) => {
    const users = await User.findAll();
    return res.json(users)
});

//Create users through the body
const create = catchError(async(req, res) => {
    const { first_name, last_name, email, password, birthday } = req.body;
    const user = await User.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        birthday: birthday,
    });
    return res.status(201).json(user);
});

//Get user by id
const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    return res.json(user);
});

//delete user by id//
const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: { id: id } });
    return res.sendStatus(204);
});

//Update user by id//
const update = catchError(async(req, res) => {
    const { id } = req. params;
    const { first_name, last_name, email, password, birthday } = req.body;
    const user = await User.update({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        birthday: birthday,
    }, { where: { id: id }, returning: true});
    return res.json(user);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}