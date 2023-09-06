import mongoose from "mongoose";
import AuthRoles from '../utils/authRoles'
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
import crypto from "crypto"
import config from "../config/index";

const userSchema = mongoose.Schema(
    {
        name: {
            type : String,
            required: [true, "Name is required"],
            maxLength: [50, "Name must be less tha 50"]
        },
        email: {
            type : String,
            required: [true, "Email is required"],
            unique : true,
        },

        password :{
            type: String,
            required: [true, "password is required"],
            minLength: [8, "password must be atleast 8 Characters"],
            select: false
        },
        role: {
            type : String,
            enum: Object.values(AuthRoles),
            default: AuthRoles.USER
        },
        forgotPasswordToken: String,
        forgotPasswordExpiry: Date,
        
    },
    {
        timestamps : true,
    },

);

//challang 1 - encrypt the password  -hooks
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// add more features directly to schema
userSchema.methods = {
    //compare password
    comparePassword: async function(enteredPassword){
        return awaitbcrypt.compare(enteredPassword, this.password)
    },
//generate JWT Token
getJwtToken:  function(){
    return JWT.sign(
        {
            _id: this._id,
            role: this.role
        },
       config.JWT_SECRET,
        {
            expiresIn: config.JWT_EXPIRY
        }
    )
},

generateForgotPasswordToken : function(){
    const forgotToken = crypto.randomBytes(20).toString('hex');

    //step 1 - save to DB
    this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotToken)
    .digest("hex")

    this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000

    //step 2 - return values to user
    return forgotToken
}

}



export default mongoose.model("User", userSchema)