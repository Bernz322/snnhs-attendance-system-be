const { User } = require('../models')

const fetchAllUsers = async (req, res) => {
    try {
        const allUsers = await User.findAll()
        if (allUsers.length <= 0) return res.status(200).json({ message: "No Users." })
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json({ message: "Fetching all users failed", error })
    }
}

const fetchUserByRFID = async (req, res) => {
    const userRFID = req.params.id

    try {
        const foundUser = await User.findOne({
            where: { RFID: userRFID },
            attributes: { exclude: ['password'] },
        })

        if (!foundUser) return res.status(404).json({ message: "User with that RFID is not found." })

        res.status(200).json(foundUser)
    } catch (error) {
        res.status(500).json({ message: "Fetching user failed", error })
    }
}

async function isUniqueRFID(RFID) {
    const exists = await User.findOne({
        where: { RFID }
    })
    if (exists) return false
    return true
}

async function isUniqueEmail(email) {
    const exists = await User.findOne({
        where: { email }
    })
    if (exists) return false
    return true
}

const addUser = async (req, res) => {
    const { rfid, name, email, password, phone, grade_level } = req.body

    const uniqueRFID = await isUniqueRFID(rfid)
    const uniqueEmail = await isUniqueEmail(email)

    if (!uniqueRFID) {
        return res.status(400).json({ message: "RFID already exist." })
    }

    if (!uniqueEmail) {
        return res.status(400).json({ message: "Email already exist." })
    }

    try {
        const newUser = await User.create({
            RFID: rfid, name, email, password, phone, grade_level,
        })

        if (newUser) {
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(500).json({ message: "Adding user failed", error })
    }
}

const updateUser = async (req, res) => {
    const userToUpdateRFID = req.params.id
    const { rfid, name, email, password, phone, grade_level } = req.body

    // Check first if the user we have to update exists or not.
    const foundUser = await User.findOne({ where: { RFID: userToUpdateRFID } })
    if (!foundUser) return res.status(404).json({ message: "User with that RFID is not found." })

    try {
        // Check if the newRFID we will put to the user already exist
        if (rfid) {
            const newRFID = await isUniqueRFID(rfid)
            if (!newRFID) {
                return res.status(400).json({ message: "RFID already exist." })
            }
        }

        if (email) {
            const uniqueEmail = await isUniqueEmail(email)
            if (!uniqueEmail) {
                return res.status(400).json({ message: "Email already exist." })
            }
        }

        if (rfid) foundUser.RFID = rfid
        if (name) foundUser.name = name
        if (email) foundUser.email = email
        if (password) foundUser.password = password
        if (phone) foundUser.phone = phone
        if (grade_level) foundUser.grade_level = grade_level

        const updatedUser = await foundUser.save()
        return res.status(200).json(updatedUser)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Updating user failed", error })
    }
}

const deleteUser = async (req, res) => {
    const userRFID = req.params.id

    try {
        const foundUser = await User.findOne({ where: { RFID: userRFID } })
        if (!foundUser) return res.status(404).json({ message: "RFID not found!" })

        await User.destroy({ where: { RFID: userRFID } })
        res.json({ rfid: userRFID })

    } catch (error) {
        res.status(500).json({ message: "Deleting user failed", error })
    }
}

module.exports = { fetchAllUsers, fetchUserByRFID, addUser, updateUser, deleteUser }