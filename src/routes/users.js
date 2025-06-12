/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User CRUD endpoints
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User object
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated user
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */


const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { users } = require('../auth');

// GET all users
router.get('/', auth, (req, res) => {
  res.json(users.map(({ password, ...u }) => u));
});

// GET single user
router.get('/:id', auth, (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const { password, ...data } = user;
  res.json(data);
});

// UPDATE user
router.put('/:id', auth, (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users[index] = { ...users[index], ...req.body };
  const { password, ...data } = users[index];
  res.json(data);
});

// DELETE user
router.delete('/:id', auth, (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users.splice(index, 1);
  res.json({ message: 'User deleted' });
});

module.exports = router;
