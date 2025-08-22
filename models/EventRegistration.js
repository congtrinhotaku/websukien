const mongoose = require("mongoose");

const EventRegistrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    registration_time: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: false, // Nếu không muốn createdAt, updatedAt
    collection: "EventRegistrations"
});

// Đảm bảo 1 người (email hoặc phone) chỉ đăng ký 1 lần cho 1 event
EventRegistrationSchema.index({ email: 1, event_id: 1 }, { unique: true });
EventRegistrationSchema.index({ phone: 1, event_id: 1 }, { unique: true });

const EventRegistration = mongoose.model("EventRegistration", EventRegistrationSchema);

module.exports = EventRegistration;
