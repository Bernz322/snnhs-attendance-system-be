const router = require('express').Router()

const { fetchAllUsers, fetchUserByRFID, addUser, updateUser, deleteUser } = require('../controllers/userController');
const { validateToken } = require('../middleware/jwt')

router.get("/", validateToken, fetchAllUsers)
router.get("/:id", fetchUserByRFID) // Hardware Route
router.post("/", validateToken, addUser)
router.put("/:id", validateToken, updateUser)
router.delete("/:id", validateToken, deleteUser)

module.exports = router