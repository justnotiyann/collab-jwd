const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const ejsLayout = require("express-ejs-layouts");
const db = require("./config/db");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize");
const cors = require("cors");

// initalize sequelize with session store
const sessionStore = SequelizeStore(session.Store);

// sync
const store = new sessionStore({
  db: db,
});
// configure express
app.use(
  session({
    secret: "collabjwd-tokobuku",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

// CORS
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.listen(3000, () => {
  console.log("server berjalan");
});

app.use(express.json());
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
const daftarRouter = require("./routes/Daftar");
const loginRouter = require("./routes/Login");
const productsRouter = require("./routes/Products");
const usersRouter = require("./routes/Users");
const transaksiRouter = require("./routes/Transaksi");

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/dashboard", dashboardRouter);
app.use("/about", aboutRouter);
app.use("/daftar", daftarRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/transaksi", transaksiRouter);

module.exports = app;
