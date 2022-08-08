const router = require("express").Router();
const users = require("../models/Users");

router.get("/", async (req, res) => {
  try {
    const email = req.body.email;
    const result = await users.findOne({ where: { email: email } });
    res.json(result);
    // res.send("oke");
    // const email = req.params;
    // const result = await users.findOne({
    //   where: { email: email },
    // });
    // if (!result) return res.json({ msg: "akun tidak ditemukan" });
    // res.json("Berhasil Login !");
  } catch (error) {
    res.json({
      msg: "terdapat error pada : " + error,
    });
  }
});

module.exports = router;
