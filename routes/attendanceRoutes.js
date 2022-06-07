const router = require('express').Router()

const { createAttendance, fetchAttendanceByRFID, fetchDayAttendance } = require('../controllers/attendanceController');
const { validateToken } = require('../middleware/jwt')

router.post("/", createAttendance)  // Hardware Route
router.get("/:id", fetchAttendanceByRFID)
router.get("/day/attendanceCount", fetchDayAttendance)

module.exports = router