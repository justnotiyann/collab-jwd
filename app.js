const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const ejsLayout = require("express-ejs-layouts");
const app = express();

app.listen(3000, () => {
  console.log("server berjalan");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(ejsLayout);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
const indexRouter = require("./routes/index");
const dashboardRouter = require("./routes/dashboard");
const aboutRouter = require("./routes/about");
const daftarRouter = require("./routes/daftar");
const loginRouter = require("./routes/login");

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/dashboard", dashboardRouter);
app.use("/about", aboutRouter);
app.use("/daftar", daftarRouter);

module.exports = app;
