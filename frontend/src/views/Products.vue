<template>
  <div class="products">
    <!-- Hero Banner -->
    <div class="products-hero">
      <div class="hero-content">
        <h1 class="fade-in">BỘ SƯU TẬP</h1>
        <div class="divider"></div>
        <p class="slide-in">Khám phá bộ sưu tập thời trang cao cấp</p>
      </div>
    </div>

    <!-- Products Content -->
    <div class="products-container">
      <product-list />
    </div>
  </div>
</template>

<script>
import ProductList from '@/components/product/ProductList.vue';
import { mapActions } from 'vuex';

export default {
  components: { ProductList },
  methods: {
    ...mapActions({
      fetchProducts: 'product/fetchProducts'
    })
  },
  async created() {
    try {
      await this.fetchProducts();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
};
</script>

<style scoped>
.products {
  min-height: 100vh;
  background-color: #f9f9f9;
}

/* Hero Section */
.products-hero {
  height: 60vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
              url('https://noithattugia.com/wp-content/uploads/2023/02/vi-sao-nen-thiet-ke-shop-quan-ao-nam.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -80px;
  position: relative;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}

.hero-content {
  text-align: center;
  color: white;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  backdrop-filter: blur(5px);
}

.hero-content h1 {
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ffffff, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.divider {
  width: 100px;
  height: 4px;
  background: linear-gradient(45deg, #ffd700, #ff4d4d);
  margin: 1.5rem auto;
  border-radius: 2px;
}

.hero-content p {
  font-size: 1.5rem;
  font-weight: 300;
  margin-top: 1rem;
}

/* Products Container */
.products-container {
  max-width: 100%;
  margin: -4rem auto 0;
  padding: 0 2rem;
  position: relative;
  z-index: 10;
}

/* Animations */
.fade-in {
  animation: fadeIn 1s ease-in;
}

.slide-in {
  animation: slideIn 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .products-hero {
    height: 50vh;
  }

  .hero-content h1 {
    font-size: 3rem;
  }

  .hero-content p {
    font-size: 1.2rem;
  }

  .products-container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .products-hero {
    height: 40vh;
  }

  .hero-content h1 {
    font-size: 2.5rem;
  }

  .hero-content p {
    font-size: 1rem;
  }
}
</style>