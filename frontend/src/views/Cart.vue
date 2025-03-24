<template>
  <div class="cart-page">
    <div class="cart-header">
      <h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="8" cy="21" r="1"></circle>
          <circle cx="19" cy="21" r="1"></circle>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
        </svg>
        Giỏ hàng của bạn
      </h1>
    </div>
    <div v-if="cart && cart.items.length" class="cart-container">
      <div class="cart-items">
        <cart-item 
          v-for="item in cart.items" 
          :key="item.product._id" 
          :item="item"
          @update="updateItem"
          @remove="removeItem"
        />
      </div>
      <div class="cart-sidebar">
        <cart-summary :cart="cart" />
        <button class="checkout-btn" @click="$router.push('/checkout')">
          <span>Thanh toán</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
    <div v-else class="empty-cart">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
      </svg>
      <p>Giỏ hàng trống</p>
      <router-link to="/products" class="continue-shopping">
        Tiếp tục mua sắm
      </router-link>
    </div>
  </div>
</template>

<script>
import CartItem from '@/components/cart/CartItem.vue';
import CartSummary from '@/components/cart/CartSummary.vue';

export default {
  components: { CartItem, CartSummary },
  computed: {
    cart() {
      return this.$store.state.cart.cart;
    },
  },
  methods: {
    updateItem({ productId, quantity }) {
      this.$store.dispatch('cart/updateCartItem', { productId, quantity });
    },
    removeItem(productId) {
      this.$store.dispatch('cart/removeFromCart', productId);
    },
  },
  created() {
    if (this.$store.getters['auth/isAuthenticated']) {
      this.$store.dispatch('cart/fetchCart');
    }
  },
};
</script>

<style scoped>
.cart-page {
  padding: 40px;
  margin-top: 60px;
  min-height: calc(100vh - 80px);
  background: linear-gradient(to bottom, #f8f9fa, #e9ecef);
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cart-header {
  margin-bottom: 40px;
  text-align: center;
  position: relative;
}

.cart-header::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(to right, #1a73e8, #0d47a1);
  border-radius: 2px;
  animation: expandWidth 0.6s ease-out;
}

@keyframes expandWidth {
  from {
    width: 0;
  }
  to {
    width: 100px;
  }
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

h1 svg {
  color: #1a73e8;
}

.cart-container {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;
  align-items: start;
  max-width: 1400px;
  margin: 0 auto;
}

.cart-items {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.cart-items:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.cart-sidebar {
  position: sticky;
  top: 100px;
  background: white;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.checkout-btn {
  width: 100%;
  background: linear-gradient(135deg, #1a73e8, #0d47a1);
  color: white;
  padding: 18px 25px;
  border: none;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.3);
  margin-top: 20px;
  position: relative;
  overflow: hidden;
}

.checkout-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease-out, height 0.6s ease-out;
}

.checkout-btn:hover::before {
  width: 300px;
  height: 300px;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(26, 115, 232, 0.4);
  background: linear-gradient(135deg, #1557b0, #0a3578);
}

.empty-cart {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  margin: 0 auto;
  animation: scaleIn 0.5s ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.empty-cart svg {
  color: #1a73e8;
  margin-bottom: 25px;
  width: 80px;
  height: 80px;
  opacity: 0.8;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

.empty-cart p {
  color: #2c3e50;
  font-size: 1.4rem;
  margin-bottom: 30px;
  font-weight: 500;
}

.continue-shopping {
  display: inline-block;
  padding: 15px 30px;
  background: linear-gradient(135deg, #1a73e8, #0d47a1);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.3);
}

.continue-shopping:hover {
  background: linear-gradient(135deg, #1557b0, #0a3578);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(26, 115, 232, 0.4);
}

@media (max-width: 1200px) {
  .cart-container {
    grid-template-columns: 1fr 340px;
    gap: 30px;
  }
}

@media (max-width: 968px) {
  .cart-container {
    grid-template-columns: 1fr;
  }
  
  .cart-page {
    padding: 30px 20px;
  }

  .cart-sidebar {
    position: static;
    margin-top: 30px;
  }
}

@media (max-width: 480px) {
  .cart-header {
    margin-bottom: 30px;
  }

  h1 {
    font-size: 1.8rem;
  }
  
  .empty-cart {
    padding: 50px 20px;
  }

  .empty-cart svg {
    width: 60px;
    height: 60px;
  }

  .empty-cart p {
    font-size: 1.2rem;
  }

  .continue-shopping {
    padding: 12px 24px;
    font-size: 1rem;
  }
}
</style>