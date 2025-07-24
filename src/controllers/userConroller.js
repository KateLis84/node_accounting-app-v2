const userService = require('../services/userService');

const getUsers = (req, res) => {
  const users = userService.getUsers();

  res.json(users);
};

const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = userService.getUserById(id);

  if (!user) {
    res.status(404).json({ error: 'User not found' });

    return;
  }

  res.json(user);
};

const createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Name is required' });

    return;
  }

  const newUser = userService.createUser({ name });

  res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Name is required' });

    return;
  }

  const updatedUser = userService.updateUser(id, { name });

  if (!updatedUser) {
    res.status(404).json({ error: 'User not found' });

    return;
  }

  res.json(updatedUser);
};

const deleteUser = (req, res) => {
  const id = Number(req.params.id);

  if (!userService.getUserById(id)) {
    return res.status(404).send('Not found');
  }

  userService.deleteUser(id);
  res.sendStatus(204);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
