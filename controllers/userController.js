const User = require("../models/Users");
const bcrypt = require("bcrypt");


// Trang đăng ký
const loadSignup = async (req, res, next) => {
  try {
    res.render("signup"); 
  } catch (error) {
    res.send(error)
  }
};

const signup = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).render("errorPage", { 
        statusCode: 400, 
        errorMessage: "Email đã tồn tại" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      role
    });

    await newUser.save();

    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).render("errorPage", { 
      statusCode: 500, 
      errorMessage: "Lỗi server!" 
    });
  }
};

const loadLogin =  async (req, res) => {
  res.render("login");
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).render("errorPage", {
        statusCode: 400,
        errorMessage: "Email không tồn tại"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).render("errorPage", {
        statusCode: 400,
        errorMessage: "Mật khẩu không đúng"
      });
    }

    req.session.user = {
      id: user._id,
      name: user.name,
    };
    req.session.loginSession = true;

    res.redirect("/users/events");
  } catch (error) {
    console.error(error);
    res.status(500).render("errorPage", {
      statusCode: 500,
      errorMessage: "Lỗi server khi đăng nhập"
    });
  }
};

module.exports = {
  loadSignup,
  signup,
  loadLogin,
  login,

};