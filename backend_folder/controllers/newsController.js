const dataService = require("../services/dataService");

exports.getArticlesByCategory = async (req, res) => {
  try {
    const articles = await dataService.getArticlesByCategory(
      req.params.category
    );
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve articles." });
  }
};
