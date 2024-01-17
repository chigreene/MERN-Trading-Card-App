const { Schema, model } = require("mongoose");
const itemSchema = require('./Item.js')

const inventorySchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        items: [itemSchema]
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