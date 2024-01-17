const { Schema, Type } = require("mongoose");

const itemSchema = new Schema(
    {
        notificationId: {
            type:Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        details: {
            type: [{}]
        }
    },
    {
        toJSON:{
            getters: true
        },
        id: true
    }
)

module.exports = itemSchema