const router = require("express").Router();
const users = require("../models/Users");

router.get("/", async (req, res) => {
  try {
    const email = req.body.email;
    const result = await users.findOne({ where: { email: email } });
    res.json(result);
  } catch (error) {
    res.json({
      msg: "terdapat error pada : " + error,
    });
  }
});

module.exports = router;
