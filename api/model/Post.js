import mongoose from 'mongoose';

const {Schema} = mongoose;

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        //post belongs to multiple category
        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Category',
                required: true
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