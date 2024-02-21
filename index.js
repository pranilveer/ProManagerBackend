const express = require("express"); 
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const dotenv = require('dotenv')
const port = process.env.PORT || 4000;
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(bodyParser.json());
app.use(cors());

app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/user"));

app.get("/health", (req, res) => {
  const dbstatus =
    mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  res.status(200).json({
    server: "Running",
    database: dbstatus,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
