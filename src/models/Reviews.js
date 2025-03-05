import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    productId: {
        type: String, // Assuming product._id is stored as a string (can be changed to mongoose.Schema.Types.ObjectId if needed)
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    reviewScore: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    reviewText: {
        type: String,
        default: '',
    }
}, {
    timestamps: true // This adds createdAt and updatedAt fields
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
