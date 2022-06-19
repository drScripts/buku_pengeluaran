const { list } = require("../controllers/business");
const authMiddleware = require("../middleware/auth-middleware");

const router = require("express").Router();

router.get("/", authMiddleware, list);

module.exports = router;
