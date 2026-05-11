const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product')
const protect = require('../middleware/protect');

router.use(protect);


// GET /api/cart
router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');

    if (!cart) return res.json({ items: [] });

    res.json(cart);

  } catch (error) { next(error); }
});


// POST /api/cart/add
router.post('/add', async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;


    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) cart = new Cart({ user: req.user.id, items: [] });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ 
      message: `Insufficient stock. Available: ${product.stock}` 
    })

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      if (product.stock < existingItem.quantity + quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock. Available: ${product.stock}, Cart quantity: ${existingItem.quantity}` 
        });
      }
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity: quantity });
    }

    await cart.save();
    res.json(cart);

  } catch (error) { 
    next(error); 
  }
});


// DELETE api/cart/remove/:productId
router.delete('/remove/:productId', async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    
    const before = cart.items.length;

    const productId = req.params.productId;
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    if (before === cart.items.length) { return res.status(404).json({ message: 'Item not found in cart' })}

    await cart.save();
    res.json(cart);

  } catch (error) {
    next(error);
  }
});