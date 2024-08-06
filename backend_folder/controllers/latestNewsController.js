const dataService = require("../services/dataService");

exports.getLatestNews = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const parsedPage = parseInt(page, 10);
  const parsedLimit = parseInt(limit, 10);

  try {
    const latestNews = await dataService.getLatestNews(parsedPage, parsedLimit);
    res.json(latestNews);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve latest news." });
  }
};
