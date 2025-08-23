const Event = require("../models/Event");
const User = require("../models/Users");


const getHomePage = async (req, res) => {
    try {
        // Lấy tất cả sự kiện từ DB (dùng lean() để render EJS dễ hơn)
        const events = await Event.find().sort({ createdAt: -1 }).lean();
        console.log(req.session.user);
        const userid = req.session.user ? req.session.user.id : null;

        const user = userid ? await User.findById(userid).lean() : null;
        console.log(user);
        res.render("trangchu", {
            title: "Trang chủ",
            events: events || [],
            user: user||null,
            message: events.length === 0 ? "Chưa có sự kiện nào." : null

        });
    } catch (error) {
        console.error("Lỗi khi load trang chủ:", error);
        res.status(500).send("Có lỗi xảy ra khi tải trang chủ");
    }
};
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Lỗi khi đăng xuất:", err);
            return res.redirect("/"); // nếu có lỗi thì về trang chủ
        }
        res.clearCookie("connect.sid"); // xóa cookie session
        return res.redirect("/");  // ✅ về trang chủ sau khi logout
    });
};


module.exports = {
    getHomePage,
    logout
};
