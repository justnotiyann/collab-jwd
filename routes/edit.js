const router = require("express").Router();
const Product = require("../models/Products");

// Get ID Product
router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const { judul_buku, penulis, kategori, penerbit, harga } = req.body;
  const result = Product.update(
    {
      judul_buku: judul_buku,
      penulis: penulis,
      kategori: kategori,
      penerbit: penerbit,
      harga: harga,
    },
    {
      where: { id: id },
    }
  );
  if (!result) return res.sendStatus(500).json({ msg: "Terjadi Kesalahan" });
  res.json("Oke berhasil di update");
  //   res.sendStatus(200).json({ msg: "Oke berhasil diupdate" });
});

module.exports = router;
