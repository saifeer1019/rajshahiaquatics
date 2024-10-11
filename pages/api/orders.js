import sequelize from '@/lib/sequelize'; // Adjusted path to your Sequelize instance
import Order from '@/models/Order'; // Adjusted path to your Order model

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const orderData = req.body;

            // Log the incoming order data for debugging
            console.log('Incoming order data:', orderData);

            // Create a new order in the database
            const newOrder = await Order.create(orderData);

            // Respond with the created order
            res.status(201).json(newOrder);
        } catch (error) {
            console.error('Error creating order:', error); // Log the error
            res.status(500).json({ error: 'Failed to create order', details: error.message });
        }
    } else if (req.method === 'GET') {
        try {
            // Fetch all orders from the database
            const orders = "ldfjgnl"

            // Respond with the list of orders
            res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error); // Log the error
            res.status(500).json({ error: 'Failed to fetch orders', details: error.message });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}