
import mongoose, { Schema } from "mongoose";

const countryCodes = {
    US: 'United States',
    CA: 'Canada',
    GB: 'United Kingdom',
    AU: 'Australia',
    IN: 'India',
    // Add more country codes and names as needed
};

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: false,
        unique: true,
        trim: true,
    },
    countryCode: {
        type: String,
        enum: Object.keys(countryCodes),
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: false,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
        required: false,
    },
    profilePic: {
        type: String,
        required: false,
        trim: true,
    },
    loginSession: [{
        type: String,
        required: false,
    }],
    isVerfied: {
        type: Boolean,
        default: false,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    followings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;