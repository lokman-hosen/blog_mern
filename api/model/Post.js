import mongoose from 'mongoose';

const {Schema} = mongoose;

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        //post belongs to multiple category
        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Category'
            }
        ],
        status: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Post", postSchema)