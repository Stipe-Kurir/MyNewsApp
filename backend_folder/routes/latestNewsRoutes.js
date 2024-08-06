const express = require("express");
const router = express.Router();
const latestNewsController = require("../controllers/latestNewsController");

router.get("/", latestNewsController.getLatestNews);

module.exports = router;
