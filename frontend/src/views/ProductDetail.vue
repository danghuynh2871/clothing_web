<template>
  <div class="product-detail-wrapper">
    <div class="product-detail" v-if="product">
      <div class="container">
        <div class="product-layout">
          <!-- Product Gallery -->
          <div class="product-gallery">
            <div class="main-image">
              <img :src="currentImage || defaultImage" :alt="product.name">
            </div>
            <div class="thumbnail-gallery" v-if="product.images && product.images.length > 1">
              <div 
                v-for="(image, index) in product.images" 
                :key="index"
                class="thumbnail"
                :class="{ active: currentImage === image }"
                @click="currentImage = image"
              >
                <img :src="image" :alt="`${product.name} - ${index}`">
              </div>
            </div>
          </div>
          
          <!-- Product Info -->
          <div class="product-info">
            <h1 class="product-title">{{ product.name }}</h1>
            <p class="product-brand">
              <span>Thương hiệu:</span> {{ product.brand }}
            </p>
            <div class="product-price">
              <span class="current-price">{{ formatPrice(product.price) }} đ</span>
              <span class="original-price" v-if="product.originalPrice">{{ formatPrice(product.originalPrice) }} đ</span>
              <span class="discount-badge" v-if="product.originalPrice">
                -{{ Math.round((1 - product.price / product.originalPrice) * 100) }}%
              </span>
            </div>
            
            <div class="product-status" v-if="product.status">
              <span class="status-label">Trạng thái:</span>
              <span :class="['status-value', product.quantity > 0 ? 'inStock' : 'outOfStock']">
                {{ product.quantity > 0 ? 'Còn hàng' : 'Hết hàng' }}
              </span>
            </div>
            
            <!-- Add new product variants section -->
            <div class="product-variants">
              <!-- Color selection -->
              <div class="variant-group" v-if="product.colors && product.colors.length">
                <h3 class="variant-title">Màu sắc</h3>
                <!-- In template section -->
                <div class="color-options">
                  <button
                  v-for="(color, index) in [
                    { code: '#FF1A1A', name: 'Đỏ' },         // Brighter red
                    { code: '#00AA00', name: 'Xanh lá' },    // Brighter green
                    { code: '#0066FF', name: 'Xanh dương' }, // Brighter blue
                    { code: '#FFDD00', name: 'Vàng' }        // Brighter yellow
                  ]"
                    :key="index"
                    class="color-option"
                    :class="{ active: selectedColor === color.code }"
                    :style="{ backgroundColor: color.code }"
                    @click="selectedColor = color.code"
                  ></button>
                </div>
                
              
              </div>
              
              <!-- Size selection -->
              <div class="variant-group" v-if="product.sizes && product.sizes.length">
                <h3 class="variant-title">Kích thước</h3>
                <div class="size-options">
                  <button
                    v-for="size in product.sizes"
                    :key="size"
                    class="size-option"
                    :class="{ active: selectedSize === size }"
                    @click="selectedSize = size"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>
            </div>
            
            <div class="product-actions">
              <div class="quantity-selector">
                <button @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
                <input type="number" v-model.number="quantity" min="1">
                <button @click="increaseQuantity">+</button>
              </div>
              <button 
                class="add-to-cart-btn" 
                @click="addToCart" 
                :disabled="!isAuthenticated || product.quantity <= 0"
              >
                <i class="fas fa-shopping-cart"></i>
                Thêm vào giỏ hàng
              </button>
              <button 
                class="buy-now-btn" 
                @click="buyNow" 
                :disabled="!isAuthenticated || product.quantity <= 0"
              >
                Mua ngay
              </button>
            </div>
            
            <div class="product-description" v-if="product.description">
              <h3>Mô tả sản phẩm</h3>
              <div v-html="product.description"></div>
            </div>
            
            <div class="product-specifications" v-if="product.specifications">
              <h3>Thông số kỹ thuật</h3>
              <table>
                <tbody>
                  <tr v-for="(value, key) in product.specifications" :key="key">
                    <td class="spec-name">{{ formatSpecName(key) }}</td>
                    <td class="spec-value">{{ value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ProductDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      quantity: 1,
      currentImage: null,
      defaultImage: require('@/assets/no-image.png')
    };
  },
  computed: {
    ...mapGetters({
      product: 'product/currentProduct',
      loading: 'product/loading',
      isAuthenticated: 'auth/isAuthenticated'
    })
  },
  methods: {
    ...mapActions({
      fetchProduct: 'product/fetchProduct',
      addToCartAction: 'cart/addToCart'
    }),
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatSpecName(name) {
      return name
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
    },
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addToCart() {
      if (!this.isAuthenticated) {
        this.$router.push('/login');
        return;
      }
      
      this.addToCartAction({
        productId: this.product._id,
        quantity: this.quantity
      }).then(() => {
        this.$toast.success('Đã thêm vào giỏ hàng');
      }).catch(error => {
        this.$toast.error('Không thể thêm vào giỏ hàng: ' + error.message);
      });
    },
    buyNow() {
      if (!this.isAuthenticated) {
        this.$router.push('/login');
        return;
      }
      
      this.addToCartAction({
        productId: this.product._id,
        quantity: this.quantity
      }).then(() => {
        this.$router.push('/checkout');
      }).catch(error => {
        this.$toast.error('Không thể thực hiện: ' + error.message);
      });
    }
  },
  created() {
    this.fetchProduct(this.id).then(() => {
      if (this.product && this.product.images && this.product.images.length > 0) {
        this.currentImage = this.product.images[0];
      }
    });
  },
  watch: {
    id(newId) {
      this.fetchProduct(newId).then(() => {
        if (this.product && this.product.images && this.product.images.length > 0) {
          this.currentImage = this.product.images[0];
        }
      });
    }
  }
};
</script>

<style scoped>
/* Global Enhancements */
.product-detail {
  padding: 60px 0 !important;
  margin-top: 80px !important;
  background: linear-gradient(145deg, #f8f9fa, #ffffff) !important;
  width: 100% !important;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.product-detail-wrapper {
  width: 100%;
  position: relative;
  isolation: isolate;
}

/* Product Layout */
.product-layout {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Gallery Enhancements */
.product-gallery {
  display: flex;
  flex-direction: column;
  gap: 25px;
  background: white;
  padding: 25px;
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.product-gallery:hover {
  transform: translateY(-5px);
}

.main-image {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  aspect-ratio: 1/1;
  background: white;
  padding: 15px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.main-image:hover img {
  transform: scale(1.03);
}

.thumbnail-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 15px;
  padding: 15px 0;
}

.thumbnail {
  width: 90px;
  height: 90px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #eee;
  transition: all 0.3s ease;
  background: white;
  position: relative;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.thumbnail:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.12);
}

.thumbnail.active {
  border-color: #1a73e8;
  box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.2);
}

/* Product Info Enhancements */
.product-info {
  background: white;
  border-radius: 20px;
  padding: 35px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}

.product-title {
  font-size: 2.4rem;
  margin: 0 0 25px;
  color: #1a1a1a;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.5px;
}

.product-brand {
  margin-bottom: 25px;
  color: #666;
  font-size: 1.2rem;
  display: inline-block;
  padding: 8px 16px;
  background: #f8f9fa;
  border-radius: 30px;
}

/* Price Section */
.product-price {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  padding: 20px;
  background: linear-gradient(to right, #f8f9fa, #ffffff);
  border-radius: 15px;
}

.current-price {
  font-size: 2.5rem;
  font-weight: 800;
  color: #e94560;
  text-shadow: 2px 2px 4px rgba(233, 69, 96, 0.1);
}

.original-price {
  font-size: 1.4rem;
  text-decoration: line-through;
  color: #999;
}

.discount-badge {
  background: linear-gradient(45deg, #e94560, #ff6b6b);
  color: white;
  font-size: 1.1rem;
  padding: 8px 16px;
  border-radius: 25px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(233, 69, 96, 0.2);
}

/* Status Section */
.product-status {
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 15px;
  background: linear-gradient(to right, #f8f9fa, #ffffff);
}

.status-value.inStock {
  background: linear-gradient(45deg, #dcf5dc, #b8f5b8);
  color: #0a8a0a;
  padding: 8px 20px;
  border-radius: 25px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(13, 138, 13, 0.1);
}

.status-value.outOfStock {
  background: linear-gradient(45deg, #ffe6e6, #ffd6d6);
  color: #dc3545;
  padding: 8px 20px;
  border-radius: 25px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.1);
}

/* Variants Section */
.variant-group {
  margin-bottom: 30px;
}

.variant-title {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #1a1a1a;
  font-weight: 600;
}

.color-options {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.color-option {
  min-width: 55px;
  padding: 16px;
  border: 2px solid #eee;
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
  font-weight: 600;
  transition: all 0.3s ease;
  background-color: white;
  color: #333;
  position: relative;
  overflow: hidden;
}

.color-option::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: var(--color);
}

.color-option.active {
  border-color: #ffffff;
  background-color: white;
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.2);
}

.color-name {
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.8);
  padding: 2px 5px;
  border-radius: 3px;
}

.size-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 16px 0;
  padding: 8px 0;
}

.size-option {
  min-width: 55px;
  padding: 10px 15px;
  border: 2px solid #eee;
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
  font-weight: 600;
  transition: all 0.3s ease;
  background: white;
}

.size-option.active {
  border-color: #1a73e8;
  background: linear-gradient(45deg, #1a73e8, #1557b0);
  color: white;
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.2);
}

/* Actions Section */
.product-actions {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.quantity-selector {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 2px solid #e1e1e1;
  border-radius: 12px;
  overflow: hidden;
  background: white;
}

.quantity-selector button {
  width: 45px;
  height: 45px;
  background-color: #f8f9fa;
  border: none;
  cursor: pointer;
  font-size: 1.3rem;
  transition: all 0.3s ease;
}

.quantity-selector button:hover:not(:disabled) {
  background-color: #e9ecef;
}

.quantity-selector input {
  width: 60px;
  height: 45px;
  text-align: center;
  border: none;
  font-size: 1.2rem;
  font-weight: 500;
}

.add-to-cart-btn, .buy-now-btn {
  padding: 0 30px;
  height: 50px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.add-to-cart-btn {
  background-color: white;
  color: #1a73e8;
  border: 2px solid #1a73e8;
  position: relative;
  overflow: hidden;
}

.add-to-cart-btn:hover:not(:disabled) {
  background: linear-gradient(45deg, #1a73e8, #1557b0);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(26, 115, 232, 0.3);
}

.buy-now-btn {
  background: linear-gradient(45deg, #1a73e8, #1557b0);
  color: white;
  border: none;
  box-shadow: 0 5px 15px rgba(26, 115, 232, 0.2);
}

.buy-now-btn:hover:not(:disabled) {
  background: linear-gradient(45deg, #1557b0, #1a73e8);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(26, 115, 232, 0.4);
}

/* Description & Specifications */
.product-description, .product-specifications {
  margin-top: 40px;
  padding: 30px;
  background: linear-gradient(to right, #f8f9fa, #ffffff);
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.product-description h3,
.product-specifications h3 {
  font-size: 1.5rem;
  margin-bottom: 25px;
  color: #1a1a1a;
  font-weight: 700;
  position: relative;
  padding-bottom: 10px;
}

.product-description h3::after,
.product-specifications h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(45deg, #1a73e8, #1557b0);
  border-radius: 3px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 15px;
  }

  .product-title {
    font-size: 1.8rem;
  }

  .current-price {
    font-size: 2rem;
  }

  .product-actions {
    flex-direction: column;
  }

  .quantity-selector {
    width: 100%;
    justify-content: center;
  }

  .add-to-cart-btn,
  .buy-now-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .product-info {
    padding: 20px;
  }

  .product-title {
    font-size: 1.5rem;
  }

  .current-price {
    font-size: 1.8rem;
  }

  .thumbnail-gallery {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  }

  .thumbnail {
    width: 70px;
    height: 70px;
  }
}
</style>