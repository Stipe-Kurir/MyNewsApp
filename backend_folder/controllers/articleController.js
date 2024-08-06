const dataService = require("../services/dataService");

exports.getArticleById = async (req, res) => {
  try {
    const article = await dataService.getArticleById(req.params.id);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: "Article not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve article." });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const updatedArticle = await dataService.toggleFavorite(req.params.id);
    if (updatedArticle) {
      res.json(updatedArticle);
    } else {
      res.status(404).json({ error: "Article not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update favorite status." });
  }
};
