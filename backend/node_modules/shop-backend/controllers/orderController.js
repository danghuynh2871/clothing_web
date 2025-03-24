const asyncHandler = require("express-async-handler");
const Order = require('../models/orderModel');

const createOrder = asyncHandler(async (req, res) => {
    const { items, shippingAddress, paymentMethod } = req.body;
    const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    const order = await Order.create({
        user: req.user.id,
        items,
        totalAmount,
        shippingAddress,
        paymentMethod
    });
    
    res.status(201).json(order);
});

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user.id }).populate('items.product');
    res.json(orders);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    );
    if (!order) {
        res.status(404);
        throw new Error("Đơn hàng không tồn tại");
    }
    res.json(order);
});

module.exports = { createOrder, getOrders, updateOrderStatus };
