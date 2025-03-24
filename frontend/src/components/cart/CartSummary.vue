<template>
  <div class="cart-summary">
    <h3 class="summary-title">Tổng đơn hàng</h3>
    <div class="summary-details">
      <div class="summary-row">
        <span>Tạm tính:</span>
        <span>{{ formatPrice(subtotal) }}đ</span>
      </div>
      <div class="summary-row">
        <span>Số lượng sản phẩm:</span>
        <span>{{ totalQuantity }}</span>
      </div>
      <div class="summary-row">
        <span>Phí vận chuyển:</span>
        <span>{{ formatPrice(shippingFee) }}đ</span>
      </div>
      <div class="summary-divider"></div>
      <div class="summary-row total">
        <span>Tổng cộng:</span>
        <span class="total-amount">{{ formatPrice(total) }}đ</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cart: {
      type: Object,
      required: true
    }
  },
  computed: {
    subtotal() {
      if (!this.cart.items || !Array.isArray(this.cart.items)) return 0;
      return this.cart.items.reduce((sum, item) => {
        const price = item.product?.price || 0;
        const quantity = item.quantity || 0;
        return sum + price * quantity;
      }, 0);
    },
    totalQuantity() {
      if (!this.cart.items || !Array.isArray(this.cart.items)) return 0;
      return this.cart.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    },
    shippingFee() {
      return this.subtotal > 500000 ? 0 : 30000;
    },
    total() {
      return this.subtotal + this.shippingFee;
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  }
};
</script>

<style scoped>
.cart-summary {
  background: #f5f5f5;
  color: #424242;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.summary-title {
  font-size: 1.25rem;
  color: #616161;
  margin: 0 0 1.5rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
}

.summary-divider {
  height: 1px;
  background: #eee;
  margin: 0.5rem 0;
}

.total {
  color: #333;
  font-weight: 600;
  font-size: 1.1rem;
}

.total-amount {
  color: #757575;
}

.confirm-order-btn {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .cart-summary {
    margin-top: 1rem;
  }
}
</style>