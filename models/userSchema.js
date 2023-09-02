import mongoose from "mongoose";


const userschema = mongoose.Schema(
    {
        name: {
            type : String,
            required: [true, "Name is required"],
            maxLength: [50, "Name must be less tha 50"]
        }
    }
)