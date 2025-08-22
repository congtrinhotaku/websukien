const NguoiDung = require("../models/Users");

module.exports = async function (req, res, next) {
  try {
    if (req.session.loginSession || req.session.signupSession) {
      const user = await NguoiDung.findOne({ Email: req.session.email });

      if (!user) return res.redirect("/login");

      if (user.Trang_Thai_Nguoi_Dung !== 'active') {
        return res.redirect("/blocked");
      }


      req.user = user;
      next();
    } else {
      return res.redirect("/login");
    }
  } catch (err) {
    console.error("authHocVien middleware error:", err);
    res.status(500).send("Lỗi máy chủ.");
  }
};
