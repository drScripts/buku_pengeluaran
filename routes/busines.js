const { list, create } = require("../controllers/business");
const authMiddleware = require("../middleware/auth-middleware");

const router = require("express").Router();

router.get("/", authMiddleware, list);
router.post("/", authMiddleware, create);

module.exports = router;
