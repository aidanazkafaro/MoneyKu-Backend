const express = require ('express');
const router = express.Router();
const moneykuController = require ("../controller/moneykuController")

router.post ('/register', moneykuController.register );
router.post ('/login', moneykuController.login);

module.exports = router;
