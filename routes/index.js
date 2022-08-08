var express = require("express");
var router = express.Router();
const books = require("../models/Books");

/* GET home page. */
router.get("/", async (req, res) => {
  try {
    const result = await books.findAll({});
    if (!result) return res.json("Terdapat error");
    res.json(result);
  } catch (error) {
    res.json({
      msg: `terdapat error ${error}`,
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { book_title, author } = req.body;
    const result = await books.create({
      book_title: book_title,
      author: author,
    });
    if (!result) return res.json("Terdapat error");
    res.json("Data berhasil ditambahkan !");
  } catch (error) {
    res.json({
      msg: `terdapat error ${error}`,
    });
  }
});

module.exports = router;
