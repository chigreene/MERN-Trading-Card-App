const { Schema, model } = require("mongoose");

const inventorySchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        items: [items]
    },
    {
        toJSON: {
            virtual: true
        },
        id: false
    }
)

inventorySchema.virtual('itemCount')
.get(function(){
    return this.items.length
})

inventorySchema.virtual('simplified')
.get(function(){
    const trimmedItems = [...new Set(items)]
    return trimmedItems.map((item)=>({
        item,
        count: items.filter((i)=> i===item? true:false).length
    }))
})

const Inventory = model('inventory', inventorySchema);

module.exports = Inventory