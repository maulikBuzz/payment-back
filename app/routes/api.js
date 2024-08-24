const express = require("express")

const router = express.Router()

const apiController = require("../controllers/api.controller")

router.post("/google-pay", apiController.googlePay)
router.post("/phone-pay", apiController.googlePay)
router.post("/pay-tm-pay", apiController.googlePay)
module.exports = router