const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnected = require("./config/DbConnect");
const Visualization = require("./model/VisualizeData");
const { default: mongoose } = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
dotenv.config();

app.get("/api/dummy-data", async (req, res, next) => {
  try {
    const data = await Visualization.find({});
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

app.post("/api/dummy-data", async (req, res, next) => {
  const {
    end_year,
    intensity,
    sector,
    topic,
    url,
    region,
    insightstart_year,
    impact,
    added,
    published,
    country,
    relevance,
    pestle,
    source,
    title,
    likelihood,
  } = req.body;
  try {
    const data = await Visualization.create({
      end_year,
      intensity,
      sector,
      topic,
      url,
      region,
      insightstart_year,
      impact,
      added,
      published,
      country,
      relevance,
      pestle,
      source,
      title,
      likelihood,
    });
    res.json({ data });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

mongoose.set('strictQuery', false)
dbConnected()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on Port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Server Crashed");
  });
