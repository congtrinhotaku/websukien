const Event = require("../models/Event");

exports.loadCreateEvent = (req, res) => {
    res.render("TaoSuKien");
};

exports.createEvent = async (req, res) => {
    try {
        const { name, description, category, start_time, end_time, location } = req.body;

        console.log("Dữ liệu form:", req.body);
        console.log("File upload:", req.files);

        // Lấy đường dẫn ảnh
        const coverImagePath = req.files["cover_image"]
            ? "/uploads/" + req.files["cover_image"][0].filename
            : "";
        const bannerImagePath = req.files["banner_image"]
            ? "/uploads/" + req.files["banner_image"][0].filename
            : "";

        // Tạo event mới
        const newEvent = new Event({
            name,
            description,
            category,
            start_time,
            end_time,
            location,
            cover_image: coverImagePath,
            banner_image: bannerImagePath
        });

        await newEvent.save();
        console.log("✅ Sự kiện đã lưu vào MongoDB");

        res.redirect("/");
    } catch (err) {
        console.error("❌ Lỗi khi tạo sự kiện:", err.message);
        res.status(500).send("Lỗi server");
    }
};