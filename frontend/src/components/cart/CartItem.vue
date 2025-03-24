<template>
  <div class="cart-item">
    <div class="item-image">
      <img :src="item.product.images[0] || defaultImage" :alt="item.product.name">
    </div>
    <div class="item-details">
      <div class="item-info">
        <h3 class="item-name">{{ item.product.name }}</h3>
        <p class="item-brand" v-if="item.product.brand">{{ item.product.brand }}</p>
      </div>
      <div class="item-actions">
        <div class="quantity-controls">
          <button 
            class="quantity-btn" 
            @click="updateQuantity(item.quantity - 1)" 
            :disabled="item.quantity <= 1"
          >
            <i class="fas fa-minus"></i>
          </button>
          <input 
            type="number" 
            v-model.number="item.quantity" 
            @change="updateQuantity(item.quantity)" 
            min="1"
            class="quantity-input"
          >
          <button 
            class="quantity-btn" 
            @click="updateQuantity(item.quantity + 1)"
          >
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div class="price-info">
          <p class="item-price">{{ formatPrice(item.product.price * item.quantity) }}đ</p>
          <p class="item-original-price" v-if="item.product.originalPrice">
            {{ formatPrice(item.product.originalPrice * item.quantity) }}đ
          </p>
        </div>
        <button class="remove-btn" @click="$emit('remove', item.product._id)">
          <i class="fas fa-trash"></i>
          Xóa
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },
    updateQuantity(quantity) {
      this.$emit('update', { productId: this.item.product._id, quantity });
    },
  },
};
</script>

<style scoped>
.cart-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #f5f5f5;
  color: #424242;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-bottom: 1rem;
  transition: transform 0.2s ease;
}

.cart-item:hover {
  transform: translateY(-2px);
}

.item-image {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-info {
  margin-bottom: 1rem;
}

.item-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
}

.item-brand {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
}

.quantity-btn {
  padding: 0.5rem 0.8rem;
  border: none;
  background: #f5f5f5;
  cursor: pointer;
  transition: background-color 0.2s;
}

.quantity-btn:hover:not(:disabled) {
  background: #e0e0e0;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-input {
  width: 50px;
  text-align: center;
  border: none;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  padding: 0.5rem;
}

.price-info {
  text-align: right;
}

.item-price {
  font-weight: 600;
  color: #616161;
  margin: 0;
  font-size: 1.1rem;
}

.item-original-price {
  color: #999;
  text-decoration: line-through;
  font-size: 0.9rem;
  margin: 0.2rem 0 0 0;
}

.remove-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  background: #9e9e9e;
  color: #f5f5f5;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.remove-btn:hover {
  background: #757575;
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
  }

  .item-image {
    width: 100%;
    height: 200px;
  }

  .item-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .price-info {
    text-align: left;
  }
}
</style>