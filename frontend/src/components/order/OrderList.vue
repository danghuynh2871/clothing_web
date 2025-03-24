<template>
  <div class="order-list">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Đang tải đơn hàng...</p>
    </div>
    <div v-else-if="!orders || orders.length === 0" class="no-orders">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
      <p>Bạn chưa có đơn hàng nào</p>
      <router-link to="/products" class="continue-shopping">
        Tiếp tục mua sắm
      </router-link>
    </div>
    <div v-else class="orders-container">
      <div v-for="order in orders" :key="order._id" class="order-item">
        <div class="order-header">
          <h3>Đơn hàng #{{ order._id.slice(-8).toUpperCase() }}</h3>
          <span :class="['order-status', `status-${order.status.toLowerCase()}`]">
            {{ getStatusText(order.status) }}
          </span>
        </div>
        <!-- Add order items section -->
        <div class="order-items">
          <div v-for="item in order.items" :key="item._id" class="order-product">
            <img :src="item.product.image" :alt="item.product.name" class="product-image">
            <div class="product-info">
              <h4>{{ item.product.name }}</h4>
              <p class="product-details">
                <span>Số lượng: {{ item.quantity }}</span>
                <span>Giá: {{ formatPrice(item.price) }}đ</span>
              </p>
            </div>
            <div class="product-total">
              {{ formatPrice(item.price * item.quantity) }}đ
            </div>
          </div>
        </div>
        <div class="order-details">
          <div class="detail-row">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span><strong>Địa chỉ:</strong> {{ order.shippingAddress }}</span>
          </div>
          <div class="detail-row">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <span><strong>Phương thức thanh toán:</strong> {{ order.paymentMethod }}</span>
          </div>
          <div class="detail-row">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="1" x2="12" y2="23"/>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
            </svg>
            <span><strong>Tổng tiền:</strong> {{ formatPrice(order.totalAmount) }}đ</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    formatPrice(price) {
      return price?.toLocaleString('vi-VN') || '0';
    },
    getStatusText(status) {
      const statusMap = {
        'pending': 'Chờ xử lý',
        'processing': 'Đang xử lý',
        'shipped': 'Đang giao hàng',
        'delivered': 'Đã giao hàng',
        'cancelled': 'Đã hủy'
      };
      return statusMap[status.toLowerCase()] || status;
    }
  }
};
</script>

<style scoped>
.order-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 40px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1a73e8;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.order-item {
  background: white;
  border-radius: 16px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.order-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.order-header h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin: 0;
}

.order-status {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.status-pending { background: #fff3cd; color: #856404; }
.status-processing { background: #cce5ff; color: #004085; }
.status-shipped { background: #d4edda; color: #155724; }
.status-delivered { background: #d1e7dd; color: #0f5132; }
.status-cancelled { background: #f8d7da; color: #721c24; }

.detail-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 15px 0;
}

.detail-row svg {
  color: #1a73e8;
  flex-shrink: 0;
}

.no-orders {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.no-orders svg {
  color: #1a73e8;
  margin-bottom: 20px;
  opacity: 0.8;
}

.no-orders p {
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 25px;
}

.continue-shopping {
  display: inline-block;
  padding: 12px 24px;
  background: linear-gradient(135deg, #1a73e8, #0d47a1);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.3);
}

.continue-shopping:hover {
  background: linear-gradient(135deg, #1557b0, #0a3578);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(26, 115, 232, 0.4);
}

@media (max-width: 768px) {
  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .order-status {
    align-self: flex-start;
  }

  .detail-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
.order-items {
  margin: 20px 0;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.order-product {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f5f5f5;
  gap: 20px;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.product-info {
  flex: 1;
}

.product-info h4 {
  margin: 0 0 8px 0;
  font-size: 1rem;
  color: #2c3e50;
}

.product-details {
  display: flex;
  gap: 20px;
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.product-total {
  font-weight: 600;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .order-product {
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .product-info {
    width: 100%;
  }

  .product-details {
    flex-direction: column;
    gap: 5px;
  }

  .product-total {
    align-self: flex-end;
  }
}
</style>
