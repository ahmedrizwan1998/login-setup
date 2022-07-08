const router = require("express").Router();
const auth = require("../middlewares/auth")
const { createUser, loginUser, logoutUser} = require("../controllers/userController");

router.route("/signup").post(createUser);
router.route("/login").get(loginUser);
router.route("/logout").get(auth, logoutUser);

module.exports = router;