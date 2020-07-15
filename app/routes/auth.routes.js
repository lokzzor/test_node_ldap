const express = require('express');
const router = express.Router()

const checkToken = require('../middleware/checkToken')
const ldap = require('../middleware/login_ldap');



router.post("/login", ldap.login_ldap);



/* const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");

const controller = require("../controllers/auth");
const controller2 = require("../controllers/user");

router.post('/signup',[verifySignUp.checkDuplicateUsernameOrEmail], controller.signup );

router.post("/signin", controller.signin);


router.get("/test/all", controller2.allAccess);

router.get("/test/user", controller2.userBoard );

router.get("/test/admin", [authJwt.verifyToken , authJwt.isAdmin ], controller2.adminBoard); */

module.exports = router 
