import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
              trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
        type: String,
        require: true,
        unique: true,
           lowercase: true,
      trim: true,
    },
    photoURL: {
        type: String,
        default: "",
    },
    credits: {
        type: Number,
        default: 50,
        minimum: 0
    },
    isCreditAvailable: {
        type: Boolean,
        default: true,
    },
    notes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Notes",
        default: []
    }

}, { timestamps: true });

const userModel = mongoose.model("User", userSchema);

export default userModel;