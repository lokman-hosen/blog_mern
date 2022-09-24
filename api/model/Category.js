import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
    title: {
      type: String,
      unique: true,
      required: true
    },
    status: {
        type: Number,
        default: 1,
    },
});

export default mongoose.model("Category", categorySchema)