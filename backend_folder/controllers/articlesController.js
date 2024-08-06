const dataService = require('../services/dataService');

exports.getFavoriteArticles = async (req, res) => {
  try {
    const favoriteArticles = await dataService.getFavoriteArticles();
    res.json(favoriteArticles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve favorite articles.' });
  }
};
