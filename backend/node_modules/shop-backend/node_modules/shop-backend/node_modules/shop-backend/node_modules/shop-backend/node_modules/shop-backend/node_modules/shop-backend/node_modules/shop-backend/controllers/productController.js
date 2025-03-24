const asyncHandler = require("express-async-handler");
const Product = require('../models/productModel');

// Thêm sản phẩm mới
const createProduct = asyncHandler(async (req, res) => {
    const { name, brand, price, specifications, status, images } = req.body;
    const product = await Product.create({ name, brand, price, specifications, status, images });
    console.log('Setting status to 201'); // Thêm log
    res.status(201).json(product);
});

// Lấy danh sách sản phẩm
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// Lấy thông tin sản phẩm theo ID
const getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Sản phẩm không tồn tại");
    }
    res.json(product);
});

// Cập nhật sản phẩm
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
        res.status(404);
        throw new Error("Sản phẩm không tồn tại");
    }
    res.json(product);
});

// Xóa sản phẩm
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Sản phẩm không tồn tại");
    }
    res.json({ message: "Sản phẩm đã được xóa" });
});

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};
