<template>
  <div class="product-card">
    <router-link :to="`/product/${product._id}`">
      <div class="product-image">
        <img :src="product.images[0] || defaultImage" :alt="product.name">
        <!-- Status badge -->
        <div class="status-badge" :class="productStatus">
          {{ productStatus === 'inStock' ? 'Còn hàng' : 'Hết hàng' }}
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-brand">{{ product.brand }}</p>
        
        <!-- Category -->
        <p class="product-category">
          <span class="label">Danh mục:</span> {{ product.category }}
        </p>

        <!-- Colors -->
        <div class="product-colors" v-if="product.colors && product.colors.length">
          <span class="label">Màu sắc:</span>
          <div class="color-list">
            <span v-for="color in product.colors" :key="color" class="color-tag">
              {{ color }}
            </span>
          </div>
        </div>

        <!-- Sizes -->
        <div class="product-sizes" v-if="product.sizes && product.sizes.length">
          <span class="label">Kích cỡ:</span>
          <div class="size-list">
            <span v-for="size in product.sizes" :key="size" class="size-tag">
              {{ size }}
            </span>
          </div>
        </div>

        <!-- Price section -->
        <div class="price-container">
          <span class="price">{{ formatPrice(product.price) }}đ</span>
          <span v-if="product.originalPrice" class="original-price">
            {{ formatPrice(product.originalPrice) }}đ
          </span>
        </div>
      </div>
    </router-link>
    <!-- Nút Thêm vào giỏ được thay bằng icon giỏ hàng -->
    <button 
      class="add-to-cart-btn" 
      @click.stop="addToCart"
      :disabled="!isAuthenticated || productStatus === 'outOfStock'"
      aria-label="Thêm vào giỏ hàng"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="9" cy="20" r="1.5" stroke="white" stroke-width="2"/>
        <circle cx="17" cy="20" r="1.5" stroke="white" stroke-width="2"/>
      </svg>
    </button>
    <!-- Nút yêu thích -->
    <button 
      class="favorite-btn" 
      @click.stop="toggleFavorite"
      aria-label="Yêu thích"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      defaultImage: require('@/assets/no-image.png')
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    },
    productStatus() {
      // Check quantity from MongoDB data
      return this.product.quantity > 0 ? 'inStock' : 'outOfStock';
    }
  },
  methods: {
    formatPrice(price) {
      return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") || "0";
    },
    async addToCart() {
      if (!this.isAuthenticated) {
        this.$router.push('/login');
        return;
      }
      
      try {
        // Get latest product data from MongoDB
        const response = await this.$axios.get(`/products/${this.product._id}`);
        const currentProduct = response.data;
    
        // Check stock from MongoDB data
        if (currentProduct.quantity < 1) {
          throw new Error('Sản phẩm đã hết hàng');
        }
    
        // Update MongoDB quantity first
        const newQuantity = currentProduct.quantity - 1;
        await this.$axios.put(`/products/${this.product._id}`, {
          quantity: newQuantity
        });
    
        // Add to cart after successful quantity update
        await this.$store.dispatch('cart/addToCart', {
          productId: this.product._id,
          quantity: 1
        });
    
        // Refresh product data to sync UI with MongoDB
        await this.$store.dispatch('product/fetchProduct', this.product._id);
        
        this.$toast.success('Đã thêm vào giỏ hàng');
      } catch (error) {
        this.$toast.error('Không thể thêm vào giỏ hàng: ' + error.message);
      }
    },
    // Add toggleFavorite method
    async toggleFavorite() {
      if (!this.isAuthenticated) {
        this.$router.push('/login');
        return;
      }
      
      try {
        await this.$store.dispatch('favorite/toggleFavorite', this.product._id);
        this.$toast.success('Đã cập nhật danh sách yêu thích');
      } catch (error) {
        this.$toast.error('Không thể cập nhật yêu thích: ' + error.message);
      }
    }
  }
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  aspect-ratio: 1;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 1rem;
  /* Remove max-height and overflow properties */
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Remove all scrollbar related styles */
.product-info::-webkit-scrollbar,
.product-info::-webkit-scrollbar-track,
.product-info::-webkit-scrollbar-thumb,
.product-info::-webkit-scrollbar-thumb:hover {
  display: none;
}

/* Adjust spacing to fit content better */
.product-name {
  font-size: 0.95rem;
  line-height: 1.4;
  margin: 0;
  color: #2c3e50; /* Changed color to a darker blue-gray */
  font-weight: 600;
}

.product-brand {
  color: #5c6ac4; /* Changed color to a nice purple-blue */
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.product-brand,
.product-category,
.product-colors,
.product-sizes {
  margin-bottom: 0.25rem;
}

.price-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.price {
  font-weight: 600;
  color: #e53935;
}

.original-price {
  color: #999;
  text-decoration: line-through;
  font-size: 0.9rem;
}

/* Sửa đổi nút thành hình tròn với icon giỏ hàng */
.product-card {
  position: relative;  /* Thêm position relative */
}

.add-to-cart-btn, .favorite-btn {
  position: absolute;
  top: 1rem;
  width: 40px;
  height: 40px;
  padding: 0;
  background: linear-gradient(135deg, #ffffff 0%, #ff0000 100%);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  opacity: 0;
  transform: translateY(-10px);
}

.add-to-cart-btn {
  right: 1rem;
}

.favorite-btn {
  right: 4.5rem;
}

.product-card:hover .add-to-cart-btn,
.product-card:hover .favorite-btn {
  opacity: 1;
  transform: translateY(0);
}

/* Thêm delay cho nút thứ hai */
.product-card:hover .favorite-btn {
  transition-delay: 0.1s;
}

.add-to-cart-btn:hover {
  transform: scale(1.1);
  background: linear-gradient(135deg, #1557b0 0%, #083275 100%);
}

.add-to-cart-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: all 0.5s ease;
}

.add-to-cart-btn:hover::before {
  left: 100%;
}

.add-to-cart-btn:hover {
  background: linear-gradient(135deg, #1557b0 0%, #083275 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(26, 115, 232, 0.3);
}

.add-to-cart-btn:disabled {
  background: linear-gradient(135deg, #9e9e9e 0%, #616161 100%);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.add-to-cart-btn i {
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.add-to-cart-btn:hover i {
  transform: translateX(-3px);
}

.product-card > a {
  text-decoration: none;
  flex-grow: 1;
}

.status-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 1;
}

.status-badge.inStock {
  background-color: rgba(46, 165, 46, 0.8);
  color: white;
}

.status-badge.outOfStock {
  background-color: rgba(255, 77, 77, 0.8);
  color: white;
}

.label {
  font-weight: 600;
  color: #666;
  font-size: 0.85rem;
}

.product-category {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.product-colors, .product-sizes {
  margin-bottom: 0.5rem;
}

.color-list, .size-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.2rem;
}

.color-tag, .size-tag {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  background-color: #f5f5f5;
  color: #666;
}

.color-tag {
  border: 1px solid #e0e0e0;
}

.size-tag {
  background-color: #e3f2fd;
  color: #1976d2;
  border: 1px solid #bbdefb;
}
</style>
