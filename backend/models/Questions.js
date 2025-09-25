import { Schema, model } from "mongoose";

const questionSchema = new Schema({
    session: { type: Schema.Types.ObjectId, ref: "Session" },
    question: String,
    answer: String,
    note: String,
    isPinned: { type: Boolean, default: false },
}, { timestamps: true });

export default model("Question", questionSchema);