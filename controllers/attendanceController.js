const { User, AttendanceRecord } = require('../models')

const createAttendance = async (req, res) => {
    const { rfid } = req.body

    try {
        const foundUser = await User.findOne({ where: { RFID: rfid } })
        const newAttendance = await AttendanceRecord.create({ RFID: rfid, UserId: foundUser.id })

        if (newAttendance) {
            res.status(200).json(newAttendance)
        }
    } catch (error) {
        res.status(500).json({ message: "Adding attendance failed", error })
    }
}

const fetchAttendanceByRFID = async (req, res) => {
    const rfid = req.params.id
    try {
        const foundUser = await User.findOne({
            where: { RFID: rfid },
            attributes: { exclude: ['password'] },
            include: [{ model: AttendanceRecord }]
        })

        if (!foundUser) return res.status(404).json({ message: "User with that RFID is not found." })

        res.status(200).json(foundUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Fetching user failed", error })
    }
}

module.exports = { createAttendance, fetchAttendanceByRFID }