const Event = require("../models/Event");

exports.loadCreateEvent = (req, res) => {
    res.render("TaoSuKien");
};

exports.createEvent = async (req, res) => {
    try {
        const { name, description, category, start_time, end_time, location } = req.body;

        console.log("Dữ liệu sự kiện nhận được:", req.body);

        const newEvent = new Event({
            name,
            description,
            category,
            start_time,
            end_time,
            location
        });

        await newEvent.save();
        console.log("Sự kiện đã lưu vào MongoDB");

        res.redirect("/");
    } catch (err) {
        console.error("Lỗi khi tạo sự kiện:", err.message);
        res.status(500).send("Lỗi server");
    }
};