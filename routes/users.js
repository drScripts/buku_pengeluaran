const { register, login, profile } = require("../controllers/users");
const authMiddleware = require("../middleware/auth-middleware");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, profile);

module.exports = router;
