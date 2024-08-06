const axios = require("axios");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const API_KEY = process.env.API_KEY;
const API_URL = "https://newsapi.org/v2/top-headlines"; // News API base URL that I used to fetch articles
const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

const fetchArticles = async () => {
  try {
    const categorizedArticles = {};

    const fetchPromises = categories.map((category) =>
      axios
        .get(API_URL, {
          params: {
            category,
            pageSize: 40,
            apiKey: API_KEY,
            country: "us",
          },
        })
        .then((response) => {
          categorizedArticles[category] = response.data.articles
            .filter(
              (article) =>
                article.title &&
                article.content &&
                article.title !== "[Removed]" &&
                article.content !== "[Removed]"
            )
            .map((article) => ({
              id: uuidv4(),
              title: article.title,
              content: article.content,
              author: article.author || "Unknown author",
              category: category,
              image: article.urlToImage,
              favorites: false,
              publishedAt: article.publishedAt,
              breakingNews: false,
            }));
        })
    );

    await Promise.all(fetchPromises);

    fs.writeFileSync(
      "articles.json",
      JSON.stringify(categorizedArticles, null, 2)
    );
    console.log("Articles have been saved to articles.json");
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
};

fetchArticles();
