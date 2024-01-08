const router = require("express").Router();

const {loginController,registerController,allUsersController, getLoginController} = require("../controller/userController");


router.post("/login", loginController)
router.post("/register", registerController);
router.get("/all-users", allUsersController);
router.get("/login",getLoginController)


module.exports = router;