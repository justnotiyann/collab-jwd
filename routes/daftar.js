const router = require("express").Router();
const users = require("../models/Users");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await users.create({
      email: email,
      password: password,
    });
    if (!result) return res.json("Terdapat kesalahan");
    res.json("Berhasil login");
  } catch (error) {
    res.json({
      msg: "Terdapat error" + error,
    });
  }
});

module.exports = router;
