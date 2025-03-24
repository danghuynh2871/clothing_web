<template>
  <div class="product-list-container">
    <!-- Filter Section -->
    <div class="filter-section">
      <h2 class="filter-title">BỘ LỌC <span>SẢN PHẨM</span></h2>
      <div class="filters-wrapper">
        <div class="filter-group">
          <label for="brand">Thương hiệu:</label>
          <div class="select-wrapper">
            <select id="brand" v-model="filters.brand" @change="applyFilters">
              <option value="">Tất cả</option>
              <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
            </select>
            <div class="select-arrow"></div>
          </div>
        </div>

        <div class="filter-group">
          <label for="price">Giá:</label>
          <div class="select-wrapper">
            <select id="price" v-model="filters.priceRange" @change="applyFilters">
              <option value="">Tất cả</option>
              <option value="0-200000">Dưới 200.000đ</option>
              <option value="200000-300000">200.000đ - 300.000đ</option>
              <option value="300000-500000">300.000đ - 500.000đ</option>
              <option value="500000">Trên 500.000đ</option>
            </select>
            <div class="select-arrow"></div>
          </div>
        </div>

        <div class="filter-group">
          <label for="status">Trạng thái:</label>
          <div class="select-wrapper">
            <select id="status" v-model="filters.status" @change="applyFilters">
              <option value="">Tất cả</option>
              <option value="inStock">Còn hàng</option>
              <option value="outOfStock">Hết hàng</option>
            </select>
            <div class="select-arrow"></div>
          </div>
        </div>

        <!-- Add search box -->
        <div class="filter-group">
          <label for="search">Tìm kiếm:</label>
          <div class="search-wrapper">
            <input
              id="search"
              type="text"
              v-model="filters.search"
              placeholder="Tìm theo tên sản phẩm..."
              @input="applyFilters"
            >
            <i class="fas fa-search search-icon"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative elements -->
    <div class="decoration-dots dots-top-right"></div>
    <div class="decoration-dots dots-bottom-left"></div>
    <div class="decoration-circle circle-top-left"></div>
    <div class="decoration-circle circle-bottom-right"></div>

    <!-- Product List Section -->
    <div class="product-list-section">
      <div class="product-header">
        <h3 class="section-title">DANH SÁCH SẢN PHẨM</h3>
        <div class="product-stats">
          <span class="found-count">Tìm thấy: <strong>{{ filteredProducts.length }}</strong> sản phẩm</span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Đang tải danh sách sản phẩm...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredProducts.length === 0" class="empty-state">
        <i class="fas fa-box-open empty-icon"></i>
        <h4>Không tìm thấy sản phẩm</h4>
        <p>Thử thay đổi điều kiện tìm kiếm hoặc bộ lọc của bạn</p>
      </div>

      <!-- Product Grid -->
      <div v-else class="product-grid">
        <product-card
          v-for="product in filteredProducts"
          :key="product._id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductCard from './ProductCard.vue';

export default {
  components: { ProductCard },
  data() {
    return {
      filters: {
        brand: '',
        priceRange: '',
        status: '',
        search: '',
      },
    };
  },
  computed: {
    ...mapState({
      products: state => state.product.products,
      loading: state => state.product.loading,
    }),
    brands() {
      return [...new Set(this.products.map(product => product.brand))];
    },
    filteredProducts() {
      let result = [...this.products];

      // Lọc theo thương hiệu
      if (this.filters.brand) {
        result = result.filter(product => product.brand === this.filters.brand);
      }

      // Lọc theo khoảng giá
      if (this.filters.priceRange) {
        const [min, max] = this.filters.priceRange.split('-').map(Number);
        result = result.filter(product => {
          if (max) {
            return product.price >= min && product.price <= max;
          }
          return product.price >= min;
        });
      }

      // Lọc theo trạng thái
    if (this.filters.status) {
      result = result.filter(product => {
        if (this.filters.status === 'inStock') {
          return product.quantity > 0;
        } else if (this.filters.status === 'outOfStock') {
          return product.quantity <= 0;
        }
        return true;
      });
    }

      // Lọc theo tìm kiếm
      if (this.filters.search) {
        const searchLower = this.filters.search.toLowerCase();
        result = result.filter(product => 
          product.name.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower)
        );
      }

      return result;
    }
  },
  methods: {
    ...mapActions({
      fetchProducts: 'product/fetchProducts'
    }),
    async loadProducts() {
      try {
        await this.fetchProducts();
      } catch (error) {
        console.error('Error loading products:', error);
      }
    },
    applyFilters() {
      // Không cần làm gì ở đây vì computed property sẽ tự động cập nhật
      // khi filters thay đổi
    },
    resetFilters() {
      this.filters = {
        brand: '',
        priceRange: '',
        status: '',
        search: '',
      };
    }
  },
  created() {
    this.loadProducts();
  }
};
</script>

<style scoped>
/* Base Styles */
.product-list-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  box-sizing: border-box;
}

/* Filter Section */
.filter-section {
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem 3rem;
  margin-bottom: 2.5rem;
  box-sizing: border-box;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 
              inset 0 1px 1px rgba(255, 255, 255, 0.5);
  position: relative;
  z-index: 10;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden; /* Prevent content from overflowing */
}

.filter-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 
              inset 0 1px 1px rgba(255, 255, 255, 0.5);
}

.filter-title {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(45deg, #005999, #1a73e8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.8rem;
  text-align: center;
  position: relative;
  letter-spacing: 1px;
}

.filter-title span {
  background: linear-gradient(45deg, #ff3e3e, #ff982d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.filter-title::after {
  content: '';
  position: absolute;
  width: 80px;
  height: 4px;
  background: linear-gradient(45deg, #005999, #1a73e8);
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
}

.filters-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  width: 100%;
  box-sizing: border-box;
}
.filter-group {
  width: 100%;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  min-width: 0; /* Prevent flex items from overflowing */
}

.filter-group label {
  display: block;
  margin-bottom: 0.8rem;
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
}

.select-wrapper {
  position: relative;
}

.select-wrapper select {
  width: 100%;
  padding: 0.9rem 1.2rem;
  border: 2px solid #e0e0e0;
  border-radius: 30px;
  background: #fff;
  appearance: none;
  font-family: inherit;
  font-size: 0.95rem;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
}

.select-wrapper select:focus {
  border-color: #1a73e8;
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.15);
  outline: none;
}

.select-arrow {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #005999;
  pointer-events: none;
  transition: transform 0.3s ease;
}

.select-wrapper:hover .select-arrow {
  transform: translateY(-50%) rotate(180deg);
}

.search-wrapper {
  position: relative;
}

.search-wrapper input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.9rem 1.2rem;
  padding-right: 45px;
  border: 2px solid #e0e0e0;
  border-radius: 30px;
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03);
}

.search-wrapper input:focus {
  border-color: #1a73e8;
  box-shadow: 0 4px 15px rgba(26, 115, 232, 0.15);
  outline: none;
}

.search-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #005999;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.search-wrapper:hover .search-icon {
  color: #1a73e8;
  transform: translateY(-50%) scale(1.1);
}

/* Product List Section */
.product-list-section {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1),
              inset 0 1px 1px rgba(255, 255, 255, 0.5);
  position: relative;
  z-index: 5;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.2rem;
  border-bottom: 2px solid rgba(238, 238, 238, 0.7);
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(45deg, #2c3e50, #4a6785);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  letter-spacing: 1px;
}

.product-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.found-count {
  color: #555;
  font-size: 1rem;
  font-weight: 500;
}

.found-count strong {
  background: linear-gradient(45deg, #1a73e8, #00c6ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  font-size: 1.1rem;
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 5rem 0;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 5px solid rgba(26, 115, 232, 0.1);
  border-top: 5px solid #1a73e8;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;
  margin: 0 auto 1.5rem;
}

.loading-state p {
  color: #555;
  font-size: 1.1rem;
  font-weight: 500;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  color: #555;
}

.empty-state .empty-icon {
  font-size: 4rem;
  background: linear-gradient(45deg, #ccc, #999);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
}

.empty-state h4 {
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  color: #2c3e50;
  font-weight: 600;
}

.empty-state p {
  font-size: 1.1rem;
  color: #666;
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Decorative Elements - Enhanced */
.decoration-dots {
  position: absolute;
  width: 200px;
  height: 200px;
  background-image: radial-gradient(#ff982d 2px, transparent 2px);
  background-size: 18px 18px;
  z-index: 1;
  opacity: 0.25;
  animation: float 15s infinite ease-in-out;
}

.dots-top-right {
  top: 30px;
  right: -50px;
  animation-delay: 0s;
}

.dots-bottom-left {
  bottom: 30px;
  left: -50px;
  animation-delay: -7s;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  z-index: 1;
  animation: pulse 8s infinite ease-in-out;
}

.circle-top-left {
  width: 150px;
  height: 150px;
  border: 4px solid rgba(0, 89, 153, 0.15);
  top: -50px;
  left: -50px;
  animation-delay: 0s;
}

.circle-bottom-right {
  width: 200px;
  height: 200px;
  border: 4px solid rgba(255, 62, 62, 0.15);
  bottom: -80px;
  right: -80px;
  animation-delay: -4s;
}

/* Enhanced Animations */
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

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.15; }
  50% { transform: scale(1.1); opacity: 0.25; }
}

/* Responsive Design - Enhanced */
@media (max-width: 992px) {
  .product-list-container {
    padding: 0 1.5rem;
  }
}

@media (max-width: 768px) {
  .product-list-container {
    padding: 0 1rem;
  }
  
  .filter-section,
  .product-list-section {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .product-list-container {
    padding: 0 0.5rem;
  }
}

/* Additional Hover Effects */
.product-item {
  transform-origin: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.product-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
