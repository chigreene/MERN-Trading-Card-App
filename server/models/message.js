const { Schema, Types } = require("mongoose");

const messageSchema = new Schema(
    {
        notificationId: {
            type:Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        subject: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        actionable: {
            type: Boolean,
            required: true
        },
        details: {
            type: [{}]
        },
        attachments:{
            type:[{}]
        },
        status: {
            type: String,
            required: true
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

module.exports = messageSchema;