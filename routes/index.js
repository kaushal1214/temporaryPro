var express = require('express');
var router = express.Router();

const {Login} = require('../controller/index');

/* GET home page. */
router.get('/', Login.homepage);

router.get('/login', Login.loginPage);

router.post('/login', Login.login);

router.post('/mfa',Login.mfa);

router.post('/',Login.getToken)

module.exports = router;