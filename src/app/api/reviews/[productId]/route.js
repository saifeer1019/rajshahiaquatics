// app/api/reviews/[productId]/route.js
import { NextResponse } from 'next/server';
import Review from '@/models/Reviews';
import sequelize from '@/lib/sequelize';

export async function GET(request, { params }) {
    const { productId } = params;

    try {
        const reviews = await Review.findAll({
            where: { productId },
        });
        return NextResponse.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error); // Log the error
        return NextResponse.json({ error: 'An error occurred while fetching reviews.' }, { status: 500 });
    }
}

export async function POST(request, { params }) {
    const { productId } = params;
    const { userEmail, userName, reviewScore, reviewText } = await request.json();

    try {
        const newReview = await Review.create({
            userEmail,
            userName,
            productId,
            productName: productId, // You might want to change this to the actual product name
            reviewScore,
            reviewText,
        });
        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        console.error('Error creating review:', error); // Log the error
        return NextResponse.json({ error: 'An error occurred while creating the review.' }, { status: 500 });
    }
}