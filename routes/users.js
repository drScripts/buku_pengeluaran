const { register, login, profile, update } = require("../controllers/users");
const authMiddleware = require("../middleware/auth-middleware");
const multer = require("multer");
const os = require("os");
const upload = multer({ dest: os.tmpdir() });

const router = require("express").Router();

router.post("/register", upload.single("profile"), register);
router.post("/login", login);
router.get("/profile", authMiddleware, profile);
router.patch("/profile", [authMiddleware, upload.single("profile")], update);

module.exports = router;
