import mongoose from 'mongoose';

const orderSchema_ = new mongoose.Schema({
    Name: { type: String, required: true },
    Address: { type: String, required: true },
    City: { type: String, required: true },
    Phone: { type: String, required: true },
    PaymentMethod: { type: String, required: true },
    PaymentStatus: { type: String, required: true },
    ProductName: { type: String, required: true },
    Price: { type: String, required: true },
    Quantity: { type: Number, required: true },
    OrderDate: { type: Date, required: true },
    OrderId: { type: String, required: true },
});


const Order_ = mongoose.models.Order_ || mongoose.model('Order_', orderSchema_);
export default Order_;
