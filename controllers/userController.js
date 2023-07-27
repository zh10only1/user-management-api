const User = require('../models/user');
const Log = require('../models/log');

const userController = {
    async register(req, res, next) {
        try {
            const { email, name, password, role } = req.body;
            const newUser = await User.create({ email, name, password, role });
            res.status(201).json(newUser);
        } catch (err) {
            console.error('error creating user:', err);
            res.status(500).json({ message: 'server error.' });
        }
    },
    async login(req, res, next) {

        const { email, password } = req.body;
        let user;
        try {
            user = await User.findOne({ where: { email: email, password: password } });
        } catch (error) {
            console.error('error logging in user:', err);
            res.status(500).json({ message: 'server error.' });
        }

        if (!user) {
            res.status(401).json({ message: 'invalid username or password.' })
        }

        let newLog;
        try {
            newLog = await Log.create({ user_activity: "Logged In", user_id: user.id });
        } catch (error) {
            console.error('error adding entry in log:', error);
            res.status(500).json({ message: 'server error.' });
        }

        res.status(200).json({ message: 'User logged in and log entry added', user: user, log: newLog });
    },
    async logout(req, res, next) {

        const { email, password } = req.body;
        let user;
        try {
            user = await User.findOne({ where: { email: email, password: password } });
        } catch (error) {
            console.error('error logging out user:', err);
            res.status(500).json({ message: 'server error.' });
        }

        if (!user) {
            res.status(401).json({ message: 'invalid username or password.' })
        }

        let newLog;
        try {
            newLog = await Log.create({ user_activity: "Logged Out", user_id: user.id });
        } catch (error) {
            console.error('error adding entry in log:', error);
            res.status(500).json({ message: 'server error.' });
        }

        res.status(200).json({ message: 'User logged  out and log entry added', user: user, log: newLog });
    },
    async update(req, res, next) {

        const { userEmail } = req.params;

        let user;
        try {
            user = await User.findOne({ where: { email: userEmail } });
        } catch (error) {
            console.error('cannot find user:', error);
            res.status(500).json({ message: 'server error.' });
        }

        if (!user) {
            res.status(404).json({ message: 'user not found' });
        }

        const { password, name, role } = req.body;

        if (password) { user.password = password; }
        if (name) { user.name = name; }
        if (role) { user.role = role; }

        try {
            await user.save();
        } catch (error) {
            res.status(500).json({ message: 'server error.' });
        }

        res.status(200).json({ message: 'user updated.', user: user });
    },
    async delete(req, res, next) {
        const { userEmail } = req.params;

        let user;
        try {
            user = await User.findOne({ where: { email: userEmail } });
        } catch (error) {
            console.error('cannot find user:', error);
            res.status(500).json({ message: 'server error.' });
        }

        if (!user) {
            res.status(404).json({ message: 'user not found.' });
            return;
        }

        try {
            await Log.destroy({ where: { user_id: user.id } })
        } catch (error) {
            console.log('cannot delete logs associated with the user', error);
            res.status(500).json({ message: 'server error.' })
        }

        try {
            await user.destroy();
        } catch (error) {
            console.error('cannot delete user:', error);
            res.status(500).json({ message: 'server error.' });
        }

        res.status(200).json({ message: "user deleted." });
    },
    async archive(req, res, next) {
        const { email } = req.body;

        let user;
        try {
            user = await User.findOne({ where: { email: email } });
        } catch (error) {
            console.error('cannot find user:', error);
            res.status(500).json({ message: 'server error.' });
        }

        if (!user) {
            res.status(404).json({ message: 'user not found.' });
        }

        if (user.status === "Archived") {
            res.status(200).json({ message: 'user is already archived.' })
        }

        user.status = "Archived";

        try {
            await user.save();
        } catch (error) {
            res.status(500).json({ message: 'server error.' })
        }

        res.status(200).json({ message: 'user archived.', user: user });
    },
    async getArchived(req, res, next) {
        let users;
        try {
            users = await User.findAll({ where: { status: "Archived" } });
        } catch (error) {
            res.status(500).json({ message: 'server error.' })
        }

        users.length > 0 ? res.status(200).json({ message: 'all archived users', users }) :
            res.status(200).json({ message: 'no archived users exist' });
    },
    async search(req, res, next) {
        const { Op } = require('sequelize');
        const { email, name, role } = req.query;

        let users;
        try {
            users = await User.findAll({
                where: { email: { [Op.like]: `%${email || ""}%` }, name: { [Op.like]: `%${name || ""}%` }, role: { [Op.like]: `%${role || ""}%` } }
            })
        } catch (error) {
            res.status(500).json({ message: 'server error.' })
        }

        res.status(200).json({ users: users });
    }
}

module.exports = userController;