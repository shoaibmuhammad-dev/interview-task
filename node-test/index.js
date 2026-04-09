const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connect = require("./config/db");
const { globalLimiter } = require("./middlewares/rateLimiter");
const cookieParser = require("cookie-parser");

dotenv.config();
connect();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(globalLimiter);

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/monitors", require("./routes/monitorRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
