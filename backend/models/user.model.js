import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        cartItems: [
            {
                quantity: {
                    type: Number,
                    default: 1
                },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                }
            }
        ],
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"]
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        resetPasswordToken: String,
        resetPasswordExpiresAt: Date,
        verificationToken: String,
        verificationTokenExpiresAt: Date,
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;