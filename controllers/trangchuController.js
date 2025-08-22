const Event = require("../models/Event");

const getHomePage = async (req, res) => {
    try {
        // Lấy tất cả sự kiện từ DB (dùng lean() để render EJS dễ hơn)
        const events = await Event.find().sort({ createdAt: -1 }).lean();

        res.render("trangchu", {
            title: "Trang chủ",
            events: events || [],
            message: events.length === 0 ? "Chưa có sự kiện nào." : null
        });
    } catch (error) {
        console.error("Lỗi khi load trang chủ:", error);
        res.status(500).send("Có lỗi xảy ra khi tải trang chủ");
    }
};

module.exports = {
    getHomePage
};
