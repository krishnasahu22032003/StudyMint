import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    credits: {
        type: Number,
        default: 50,
        minimum: 0
    },
    isCreditAvaliable: {
        type: Boolean,
        default: true,
    },
    notes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Notes",
        default: []
    }

}, { timestamps: true });

const userModel = mongoose.model("User" , userSchema);

export default userModel ;