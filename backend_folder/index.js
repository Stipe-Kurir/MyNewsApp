const express = require("express");
const cors = require("cors");
const articleRoutes = require("./routes/articleRoutes");
const favoriteRoutes = require("./routes/articlesRoutes");
const latestNewsRoutes = require("./routes/latestNewsRoutes");
const newsRoutes = require("./routes/newsRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/article", articleRoutes);
app.use("/articles/favorites", favoriteRoutes);
app.use("/latest-news", latestNewsRoutes);
app.use("/news", newsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
