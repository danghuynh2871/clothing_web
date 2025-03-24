<style scoped>
.current-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff5722; /* Đồng bộ màu giá với ProductCard */
}

.add-to-cart-btn {
  background-color: #fff;
  color: #1a73e8;
  border: 1px solid #1a73e8;
}

.add-to-cart-btn:hover {
  background-color: #f5f9ff;
}

.buy-now-btn {
  background-color: #ff5722; /* Thay đổi màu để nổi bật hơn */
  color: white;
  border: 1px solid #ff5722;
}

.buy-now-btn:hover {
  background-color: #e64a19;
}

.add-to-cart-btn:disabled, .buy-now-btn:disabled {
  background-color: #f5f5f5;
  color: #999;
  border-color: #ddd;
  cursor: not-allowed;
}
</style>