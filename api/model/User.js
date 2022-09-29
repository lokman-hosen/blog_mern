import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
          type: String,
          required: true
        },
        user_type: {
          type: String,
          required: true,
          default: 'author', //admin and author
        },
        image: {
            type: String,
            required: true
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        status: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("User", userSchema)