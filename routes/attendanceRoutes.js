const router = require('express').Router()

const { createAttendance, fetchAttendanceByRFID } = require('../controllers/attendanceController');
const { validateToken } = require('../middleware/jwt')

router.post("/", createAttendance)  // Hardware Route
router.get("/:id", fetchAttendanceByRFID)

module.exports = router