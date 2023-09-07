import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required: [true, "Please provide a product name"],
            trim: true,
            maxLength: [120, "Product name should be a max of 120 characters"]
        },

    
        price: {
            type: Number,
            required: [true, "Please provide a product name"],
            maxLength: [5, "Product Price should be not be more than 5 digits"]
        },


        description: {
            type:String,
            //use some form of editor - personal assignment
        },
    
        photos: [
            {
                secure_url: {
                    type: String,
                    required: true
                }
            }
        ],
        stock: {
            type: Number,
            default: 0
        },
        sold: {
            type: Number,
            default: 0
        },
        collectionID: {
            type: mongoose.Schema.Types.ObjectId , //it is for storing collection id.
            ref: "Collection"
        }

    },

    {
        timestamps: true
    }
)

export default mongoose.model("Products", productSchema)