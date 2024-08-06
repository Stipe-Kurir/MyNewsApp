const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

router.get("/:category", newsController.getArticlesByCategory);

module.exports = router;
