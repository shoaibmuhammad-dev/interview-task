const mongoose = require('mongoose')

const MonitorSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    method: {
        type: String,
        enum: ["GET","POST"],
        default: "GET"
    },
    expectedStatusCode: {
        type: Number,
        default: 200
    },
    interval: {
        type: Number,
        default: 60
    },
    timeout: {
        type: Number,
        default: 5000
    },
    isActive: {
        type: Boolean,
        default: true
    }
}
,{
    timestamps:true
}
)

module.exports = mongoose.model('Monitor', MonitorSchema)