import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: {
            type: String, required: true,
            unique: true
        },
        password: {
            type: String,
            required: function () {
                return !this.googleId;
            },
        },
        googleId: {
            type: String,
            unique: false,
        },
        profileImageUrl: { type: String, default: null },
    },
    { timestamps: true }
);

export default model("User", UserSchema);