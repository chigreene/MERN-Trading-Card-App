const { Schema, model } = require("mongoose");
const reactionSchema = require('./Notification')

const inboxSchema = new Schema(
    {
        user:{
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        notifications: [notificationSchema],
        messages: [messageSchema]
    },
    {
        toJSON:{
            virtuals:true
        },
        id: false
    }
)

inboxSchema.virtual('noteCount')
.get(function(){
    return this.notifications.length;
});

inboxSchema.virtual('fullBox')
.get(function(){
    function compare(a, b){
        return a-b;
    }
    return this.notifications.concat(this.messages).sort(compare(a.createdAt, b.createdAt));
});

const Inbox = model('inbox', inboxSchema);

module.exports = Inbox;