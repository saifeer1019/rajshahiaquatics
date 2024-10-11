"use client";

import { useSelector } from 'react-redux';
import CustomizeProducts from './CustomizeProducts';
import ProductImages from "@/components/ProductImages";
import { useState, useEffect } from 'react';
import { useWixClient } from '@/hooks/useWixClient';
import { useUser } from '@auth0/nextjs-auth0/client';
import Add from './Add';
import Star from '@mui/icons-material/Star'; // Import filled star icon
import StarBorder from '@mui/icons-material/StarBorder'; // Import unfilled star icon

const SinglePageClient = ({ product, variants }) => {
    const [selectedVariant, setSelectedVariant] = useState();
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(product.price?.price);
    const image = product.media?.items[0].image.url;

    // Auth0
    const { user, error, isLoading } = useUser();

    // Review state
    const [reviewText, setReviewText] = useState("");
    const [reviewScore, setReviewScore] = useState(4); // Default review score
    const [reviews, setReviews] = useState([]); // State to hold reviews
    const [averageRating, setAverageRating] = useState(0); // State for average rating

    const [variantImage, setvariantImage] = useState();
    const wixClient = useWixClient();

    async function fetchVariant() {
        const productVariantImage = await wixClient.products.getStoreVariant(`${product._id}-${selectedVariant._id}`);
        setvariantImage(productVariantImage.variant);
    }

    useEffect(() => {
        selectedVariant ? fetchVariant() : null;
    }, [selectedVariant]);

    // Fetch reviews from the API
    const fetchReviews = async () => {
        const response = await fetch(`/api/reviews/${product._id}`);
        if (response.ok) {
            console.log("fetching reviews");
            const data = await response.json();
            setReviews(data);
            console.log(data);
            // Calculate average rating
            const avgRating = data.length > 0 ? data.reduce((acc, review) => acc + review.reviewScore, 0) / data.length : 0;
            setAverageRating(avgRating);
        } else {
            console.error('Failed to fetch reviews');
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [product._id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (reviewText && user) {
            const reviewData = {
                userEmail: user.email,
                userName: user.name,
                reviewScore,
                reviewText,
            };

            const response = await fetch(`/api/reviews/${product._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });

            if (response.ok) {
                const newReview = await response.json();
                setReviews([...reviews, newReview]); // Add new review to the list
                setReviewText(""); // Clear the input field
                setReviewScore(4); // Reset to default score
                fetchReviews(); // Refresh the reviews
            } else {
                console.error('Failed to submit review');
            }
        }
    };

    return (
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 mt-4">
            {/* IMG */}
            <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
                <ProductImages items={product.media?.items} />
            </div>
            {/* TEXTS */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <h1 className="text-4xl font-medium">{product.name}</h1>
                <h2 className="text-xl font-medium">
                   {/* Display average rating */}
                </h2>
                
                <h2 className="text-xl font-medium">
                
                    <span className="flex items-center">
                   <span className="mr-2 bg-slate-200  px-2 py-1 rounded-md"> {averageRating.toFixed(1)}</span>
                        {Array.from({ length: 5 }, (_, index) => (
                            index < Math.round(averageRating) ? <Star key={index} sx={{ color: '#f69f29' }} /> : <StarBorder key={index} sx={{ color: '#f69f29' }} />
                        ))}
                        <span className="ml-2">({reviews.length} reviews)</span>
                    </span>
                </h2>
                <p className="text-gray-500">{product.description}</p>
                <div className="h-[2px] bg-gray-100" />
                {!selectedVariant ? 
                    product.price?.price === product.price?.discountedPrice ? (
                        <h2 className="font-medium text-2xl">Tk. {product.price?.price}</h2>
                    ) : (
                        <div className="flex items-center gap-4">
                            <h3 className="text-xl text-gray-500 line-through">Tk. {product.price?.price}</h3>
                            <h2 className="font-medium text-2xl">Tk. {product.price?.discountedPrice}</h2>
                        </div>
                    ) : product.price?.price === product.price?.discountedPrice ? (
                        <h2 className="font-medium text-2xl">Tk. {selectedVariant.variant.priceData.price}</h2>
                    ) : (
                        <div className="flex items-center gap-4">
                            <h3 className="text-xl text-gray-500 line-through">Tk. {selectedVariant.variant.priceData.price}</h3>
                            <h2 className="font-medium text-2xl">Tk. {selectedVariant.variant.priceData.discountedPrice}</h2>
                        </div>
                    )}
                <div className="h-[2px] bg-gray-100" />
                {product.variants && product.productOptions ? (
                    <CustomizeProducts
                        productName={product.name}
                        variants={product.variants}
                        productOptions={product.productOptions}
                        setSelectedVariant={setSelectedVariant} 
                        selectedVariant={selectedVariant} 
                        quantity={quantity} // Pass down quantity
                        setQuantity={setQuantity} 
                        image={image}
                        setPrice={setPrice}
                        price={price}
                    />
                ) : (
                    <Add
                        productName={product.name}
                        variant={[""]}
                        stockNumber={selectedVariant?.stock?.quantity || 0}
                        quantity={quantity} // Pass down quantity
                        setQuantity={setQuantity} 
                        image={image}
                        setPrice={setPrice}
                        price={price}
                    />
                )}
                <div className="h-[2px] bg-gray-100" />
                
                {/* Review Submission Form */}
                <h1 className="text-2xl">Review this product</h1>
                <h2>Purchase this to leave a review</h2>

                
         {/*      <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your review here..."
                        className="border rounded-md p-2"
                        rows="4"
                    />
                    <label className="text-sm">Rating:</label>
                    <select value={reviewScore} onChange={(e) => setReviewScore(Number(e.target.value))} className="border rounded-md p-2">
                        <option value={1}>1 Star</option>
                        <option value={2}>2 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={5}>5 Stars</option>
                    </select>
                    <button type="submit" className="bg-lama text-white rounded-md p-2">Submit Review</button>
                </form> */}
                <div className="h-[2px] bg-gray-100" />
                
                <h1 className="text-2xl">User Reviews</h1>
                <div className="flex flex-col gap-2">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="border p-2 rounded-md">
                                <strong>{review.userName}</strong> - {review.reviewScore} Stars
                                <p>{review.reviewText}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SinglePageClient;