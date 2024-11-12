const express = require("express");
const router = express.Router();

const userRoute = require("./userRoute");
const orderRoute = require("./orderRoute");
const paymentRoute = require("./paymentRoute");
const productRoute = require("./productRoute");
const apiTestRoute = require("./apiTestRoute");
const BrunoApiTestRoute = require("./BrunoApiTestRoute");

router.use("/api/v1/user", userRoute);
router.use("/api/v1/order", orderRoute);
router.use("/api/v1/payment", paymentRoute);
router.use("/api/v1/product", productRoute);
router.use("/api/v1/test", apiTestRoute);
router.use("/api/v1/bruno-test", BrunoApiTestRoute);

module.exports = router;