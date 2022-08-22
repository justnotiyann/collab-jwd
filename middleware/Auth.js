const Admin = require("../models/Admin");
const { confirmUI } = require("../routes/component");

const verifyUser = async (req, res, next) => {
  const session = req.session.userid;
  if (!session) {
    confirmUI("Harap Login", "Harap login ke akun anda", "login", res);
  } else {
    const result = await Admin.findOne({ where: { id: session } });
    if (!result) {
      confirmUI("Gagal Login", "Gagal login ke akun anda", "login", res);
    } else {
      next();
    }
  }
};

module.exports = verifyUser;
