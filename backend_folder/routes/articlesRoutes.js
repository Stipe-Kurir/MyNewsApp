const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/articlesController");

router.get("/", favoriteController.getFavoriteArticles);

module.exports = router;
