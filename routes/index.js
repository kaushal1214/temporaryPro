var express = require('express');
var router = express.Router();

const {Login} = require('../controller/index');

/* GET home page. */
router.get('/', Login.homepage);

router.post('/',Login.getToken)

module.exports = router;
