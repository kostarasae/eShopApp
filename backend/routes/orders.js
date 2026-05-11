const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product')
const Order = require('../models/Order')
const protect = require('../middleware/protect');

router.use(protect);


// POST /api/order
router.post('/', async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

        if (!cart) return res.status(400).json({ message: 'Cart not found' });

        let totalAmount = 0;

        for (const item of cart.items) {
            if (item.product.stock < item.quantity) return res. status(400).json({
                message: `Insufficient stock. Available: ${item.product.stock}`
            })
            totalAmount += item.product.price * item.quantity;
            await Product.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.quantity } });
        }

        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity
        }));

        const { shippingAddress } = req.body;

        const order = await Order.create({
            user: req.user.id,
            items: orderItems,
            totalAmount: totalAmount,
            shippingAddress: shippingAddress
        });

        cart.items = [];

        await cart.save();

        res.status(201).json(order);

    } catch (error) { next(error); }
});


// GET /api/orders/my
router.get('/my', async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        next(error);
    }
});


// GET /api/orders/:id
router.get('/:id', async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id );
        if (!order) return res.status(404).json({ message: `Order not found`});
        if (order.user.toString() !== req.user.id) return res.status(403).json({ message: `Forbidden`});
        res.json(order);
    } catch (error) {
        next(error);
    }
});