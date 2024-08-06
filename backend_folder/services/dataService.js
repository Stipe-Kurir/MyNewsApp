const fs = require("fs");
const path = require("path");

const ARTICLES_FILE_PATH = path.join(__dirname, "../articles.json");

let articles = {};

const loadArticles = () => {
  try {
    const data = fs.readFileSync(ARTICLES_FILE_PATH, "utf8");
    articles = JSON.parse(data);
    if (!articles || typeof articles !== "object") {
      articles = {};
    }
  } catch (error) {
    console.error("Error reading articles from file:", error);
  }
};

const saveArticles = () => {
  try {
    fs.writeFileSync(
      ARTICLES_FILE_PATH,
      JSON.stringify(articles, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error("Error writing articles to file:", error);
  }
};

loadArticles();

const getArticleById = async (id) => {
  return Object.values(articles)
    .flat()
    .find((article) => article.id === id);
};

const toggleFavorite = async (id) => {
  let articleFound = null;
  for (const category in articles) {
    const article = articles[category].find((article) => article.id === id);
    if (article) {
      article.favorites = !article.favorites;
      articleFound = article;
      saveArticles();
      break;
    }
  }
  return articleFound;
};

const getLatestNews = async (page, limit) => {
  const categoryArticles = Object.values(articles).flat();
  const sortedArticles = categoryArticles.sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return sortedArticles.slice(startIndex, endIndex);
};

const getArticlesByCategory = async (category) => {
  return category === "home"
    ? Object.values(articles).flat()
    : articles[category] || [];
};

const getFavoriteArticles = async () => {
  return Object.values(articles)
    .flat()
    .filter((article) => article.favorites === true);
};

module.exports = {
  getArticleById,
  toggleFavorite,
  getLatestNews,
  getArticlesByCategory,
  getFavoriteArticles,
};
