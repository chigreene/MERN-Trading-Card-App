const { Schema, Types } = require("mongoose");

const notificationSchema = new Schema(
    {
        notificationId: {
            type:Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        type: {
            type: String,
            required: true
        },
        details: {
            type: [{}]
        },
        status: {
            type: String,
            required: true
        },
        actionable: {
            type: Boolean
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

module.exports = reactionSchema;