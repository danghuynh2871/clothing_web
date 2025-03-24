const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Vui lòng nhập tên danh mục"],
            unique: true,
        },
        description: {
            type: String,
            required: [true, "Vui lòng nhập mô tả danh mục"],
        },
        image: {
            type: String,
            required: [true, "Vui lòng thêm ảnh danh mục"],
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Category', categorySchema);
