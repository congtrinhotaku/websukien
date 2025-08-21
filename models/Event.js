const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 150
    },
    description: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        default: "other"
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true,
        maxlength: 255
    },
    cover_image: {
        type: String,
        default: ""
    },
    banner_image: {
        type: String,
        default: ""
    }
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "Events"
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;