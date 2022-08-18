const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("about", {
    layout: "./layout/main",
    title: "Halaman Data Users",
  });
});

module.exports = router;
