const Event = require("../models/Event");
const EventRegistration = require("../models/EventRegistration")

exports.loadCreateEvent = (req, res) => {
    console.log("Session user:", req.session.user);
    res.render("TaoSuKien");
};

exports.createEvent = async (req, res) => {
    try {
        const user = req.session.user;
        if (!user) {
            return res.status(401).send("Bạn cần đăng nhập để tạo sự kiện");
        }

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
            banner_image: bannerImagePath,
            id_user: user.id
        });

        await newEvent.save();
        console.log("✅ Sự kiện đã lưu vào MongoDB");

        res.redirect("/users/events");
    } catch (err) {
        console.error("❌ Lỗi khi tạo sự kiện:", err.message);
        res.status(500).send("Lỗi server");
    }
};

exports.crudSuKien = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const events = await Event.find({ id_user: userId }).sort({ start_time: -1 }); 
        res.render("crudsukien", { events });
    } catch (error) {
        console.error("Lỗi khi lấy sự kiện:", error);
        res.status(500).send("Lỗi server");
    }
};


// Hiển thị form edit
exports.loadEditEvent = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const eventId = req.params.id;

        const event = await Event.findOne({ _id: eventId, id_user: userId });
        if (!event) {
            return res.status(404).send("Sự kiện không tồn tại hoặc bạn không có quyền chỉnh sửa");
        }

        res.render("edtsukien", { title: "Sửa sự kiện", event });
    } catch (error) {
        console.error("Lỗi khi load form edit:", error);
        res.status(500).send("Lỗi server");
    }
};

// Xử lý POST edit
exports.editEvent = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const eventId = req.params.id;

        const updatedData = {
            name: req.body.name,
            description: req.body.description || "",
            category: req.body.category || "other",
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            location: req.body.location,
            cover_image: req.body.cover_image || "",
            banner_image: req.body.banner_image || ""
        };

        const event = await Event.findOneAndUpdate(
            { _id: eventId, id_user: userId },
            updatedData,
            { new: true }
        );

        if (!event) {
            return res.status(404).send("Sự kiện không tồn tại hoặc bạn không có quyền chỉnh sửa");
        }

        res.redirect("/users/events");
    } catch (error) {
        console.error("Lỗi khi cập nhật sự kiện:", error);
        res.status(500).send("Lỗi server");
    }
};

// Xóa sự kiện
exports.deleteEvent = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const eventId = req.params.id;

        const event = await Event.findOneAndDelete({ _id: eventId, id_user: userId });
        if (!event) {
            return res.status(404).send("Sự kiện không tồn tại hoặc bạn không có quyền xóa");
        }

        res.redirect("/users/events");
    } catch (error) {
        console.error("Lỗi khi xóa sự kiện:", error);
        res.status(500).send("Lỗi server");
    }
};


exports.loadInviteForm = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);
        if(!event) {
            return res.status(404).send("Sự kiện không tồn tại");
        }
        res.render("dangkysukien", { event }); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Lỗi server");
    }
};


exports.submitInviteForm = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { name, email, phone } = req.body;

        // Kiểm tra event tồn tại
        const event = await Event.findById(eventId);
        if(!event) {
            return res.status(404).send("Sự kiện không tồn tại");
        }

        // Tạo đăng ký mới
        const registration = new EventRegistration({
            name,
            email,
            phone,
            event_id: eventId
        });

        await registration.save();
        res.send("Đăng ký thành công!");
    } catch (error) {
        console.error(error);
        // Kiểm tra lỗi trùng lặp email/phone
        if(error.code === 11000){
            return res.send("Bạn đã đăng ký sự kiện này rồi!");
        }
        res.status(500).send("Đăng ký thất bại, vui lòng thử lại");
    }
};

