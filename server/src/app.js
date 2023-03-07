require("dotenv").config();
const connectDB = require("./config/connect");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const companyRouter = require("./routes/company");
const globalRouter = require("./routes/global");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use("/api", authRouter);
app.use("/api", globalRouter);
app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);

// Start the server
const port = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port}`));
  } catch (err) {
    console.error(err);
  }
};

startServer();
