const { createToken } = require("../middleware/jwt")

const { User } = require('../models');

/**
 * @desc Login user and return its data with JWT token.
 * @route POST /api/auth/login
 * @access Public
 * @param {*} req.body 
 * @returns {Promise} Promise
 */
const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const foundUser = await User.findOne({ where: { email } })
        if (!foundUser) return res.status(404).json({ message: "You are not registered. Please contact your admin." })

        if (foundUser.password === password) {
            if (foundUser.is_admin) {
                res.status(200).json({
                    id: foundUser.id,
                    name: foundUser.name,
                    is_admin: foundUser.is_admin,
                    token: createToken(foundUser),
                    time_stamp: Date.now(),
                    expire_time: 60 * 1000 * 60 * 12, // 1000 mil * 60 sec = 1 min * 60 = 1 hr * 3 = 3hrs
                });
            } else {
                res.status(200).json({
                    id: foundUser.id,
                    rfid: foundUser.RFID,
                    name: foundUser.name,
                    email: foundUser.email,
                    phone: foundUser.phone,
                    grade_level: foundUser.grade_level,
                    token: createToken(foundUser),
                    time_stamp: Date.now(),
                    expire_time: 60 * 1000 * 60 * 12,
                });
            }
        } else {
            res.status(401).json({ message: "Wrong credentials" })
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while logging in.", error })
    }
}

module.exports = { login }