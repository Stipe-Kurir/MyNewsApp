const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

router.get("/:id", articleController.getArticleById);

router.patch("/:id", articleController.toggleFavorite);

module.exports = router;
