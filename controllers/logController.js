const User = require('../models/user');
const Log = require('../models/log');

const logController = {
    async delete(req, res, next) {
        const { id } = req.params;

        let log;
        try {
            log = await Log.findOne({ where: { id: id } });
        } catch (error) {
            console.error('cannot find log:', error);
            res.status(500).json({ message: 'server error.' });
        }

        if (!log) {
            res.status(404).json({ message: 'log not found.' });
            return;
        }

        try {
            await log.destroy();
        } catch (error) {
            console.error('cannot delete log:', error);
            res.status(500).json({ message: 'server error.' });
        }

        res.status(200).json({ message: "log deleted." });
    },
    async getByUserEmail(req, res, next) {
        const { email } = req.params;

        let user;
        try {
            user = await User.findOne({ where: { email: email } });
        } catch (error) {
            console.error('cannot find user:', error);
            res.status(500).json({ message: 'server error.' });
        }

        if (!user) {
            res.status(404).json({ message: 'user not found.' });
            return;
        }

        let logs;
        try {
            logs = await Log.findAll({ where: { user_id: user.id } });
        }
        catch (error) {
            console.error('cannot find logs', error);
            res.status(500).json({ message: 'server error.' });
        }

        res.status(200).json({ logs: logs });
    },
    async recentLogs(req, res, next) {
        const { email } = req.params;

        let user;
        try {
            user = await User.findOne({ where: { email: email } });
        } catch (error) {
            console.error('cannot find user:', error);
            res.status(500).json({ message: 'server error.' });
        }

        if (!user) {
            res.status(404).json({ message: 'user not found.' });
            return;
        }

        let logs;
        try {
            logs = await Log.findAll({
                order: [['createdAt', 'DESC']],
                limit: 5
            });
        }
        catch (error) {
            console.error('cannot find logs', error);
            res.status(500).json({ message: 'server error.' });
        }

        res.status(200).json({ logs: logs });
    }
}

module.exports = logController;