const router = require("express").Router();
const Product = require("../models/Products");

// DELETE function
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Product.destroy({ where: { id: id } });
  if (!result) return res.json({ msg: "Data tidak ditemukan" });
  res.json({ msg: "Data berhasil dihapus" });
});

module.exports = router;
