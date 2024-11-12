const express = require("express");
const router = express.Router();
const { getTokenInfo } = require("../controllers/BrunolApiTest");

router.route("/token-info").get(getTokenInfo);

module.exports = router;
