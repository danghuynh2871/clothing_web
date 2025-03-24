<template>
  <div class="home">
    <!-- Image Slider -->
    <div class="image-slider">
      <transition-group name="fade">
        <img 
          v-for="(image, index) in images" 
          :key="index"
          :src="image"
          :class="['slider-image', { active: index === currentIndex }]"
          alt="Slider image"
        />
      </transition-group>
      
      <!-- Hero Content Overlay -->
      <div class="hero-content-overlay">
        <h1 class="fade-in">THẾ GIỚI THỜI TRANG</h1>
        <h2 class="super-sale">Tại Shopping MÊ</h2>
        <p class="hero-text slide-in">
          Ẩm thực trang phục chất lượng cao với giá tốt nhất!
        </p>
        <router-link to="/products" class="cta-btn">XEM SẢN PHẨM NGAY</router-link>
      </div>
    </div>

    <!-- Category Icons Section -->
    <div class="category-icons">
      <router-link to="/products" class="category-item" v-for="(category, index) in categories" :key="index">
        <div class="category-icon">
          <svg viewBox="0 0 24 24" width="48" height="48">
            <path :d="category.icon"/>
          </svg>
          <span>{{ category.name }}</span>
        </div>
      </router-link>
    </div>

    <!-- Features Section -->
    <section class="features">
      <div class="feature-item fade-in">
        <div class="feature-image-container">
          <img src="https://lavendermedia.vn/wp-content/uploads/2019/04/word-image-11.png" alt="Latest clothes" class="feature-image">
          <div class="circle-overlay"></div>
        </div>
        <h3>Sản phẩm mới nhất</h3>
        <p>Luôn cập nhật sản phẩm mới nhất!</p>
      </div>
      <div class="feature-item fade-in">
        <div class="feature-image-container">
          <img src="https://anviethouse.vn/wp-content/uploads/2021/07/ca-tinh-rieng-cua-shop.jpg" alt="Accessories" class="feature-image">
          <div class="circle-overlay"></div>
        </div>
        <h3>Thời trang đa dạng</h3>
        <p>Mẫu mã đa dạng, phong cách thời trang mới!</p>
      </div>
      <div class="feature-item fade-in">
        <div class="feature-image-container">
          <img src="https://noithattugia.com/wp-content/uploads/2023/02/vi-sao-nen-thiet-ke-shop-quan-ao-nam.jpg" alt="Best Deals" class="feature-image">
          <div class="circle-overlay"></div>
        </div>
        <h3>Ưu đãi hấp dẫn</h3>
        <p>Giá hấp dẫn, nhiều chương trình khuyến mãi đặc biệt.</p>
      </div>
    </section>

    <!-- Social Media -->
    <div class="social-media">
      <a href="#" class="social-icon twitter">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
      </a>
      <a href="#" class="social-icon instagram">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </a>
      <a href="#" class="social-icon whatsapp">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </a>
      <a href="#" class="social-icon youtube">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      images: [
        'https://pendecor.vn/uploads/files/2023/04/18/thiet-ke-shop-quan-ao-nam-nho-2.jpg',
        'https://spacet-release.s3.ap-southeast-1.amazonaws.com/img/blog/2023-10-03/shop-quan-ao-danh-cho-nam-thuong-mang-mau-sac-tram-651beaa7c9649b0ef5ad9324.webp',
        'https://gotrangtri.vn/wp-content/uploads/2020/06/mau-shop-thoi-trang-dep6.jpg'
      ],
      currentIndex: 0,
      timer: null,
      categories: [
        { name: 'Áo Dài Tay', icon: 'M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5-2v2H9V4h6z' },
        { name: 'Quần', icon: 'M6 2L2 6v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6l-4-4H6zm0 2h12l2 2H4l2-2z' },
        { name: 'Áo Thun', icon: 'M16 4l4 4v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V8l4-4h8z' },
        { name: 'Áo Khoác', icon: 'M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z' },
        { name: 'Phụ Kiện', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z' },
        { name: 'Áo Polo', icon: 'M20.94 11c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z' }
      ]
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex];
    }
  },
  mounted() {
    this.startSlider();
  },
  beforeDestroy() {
    this.stopSlider();
  },
  methods: {
    startSlider() {
      this.timer = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }, 3000); // Change image every 3 seconds
    },
    stopSlider() {
      clearInterval(this.timer);
    }
  }
};
</script>

<style scoped>
/* Base Styles */
.home {
  font-family: 'Montserrat', 'Roboto', sans-serif;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
  color: #ffffff;
  min-height: 100vh;
  letter-spacing: -0.02em;
}

/* Image Slider */
.image-slider {
  height: 100vh;
  margin-top: -80px;
  position: relative;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
}

.slider-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  filter: brightness(0.7) saturate(1.1) contrast(1.1);
  transition: opacity 1s ease;
}

.slider-image.active {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Hero Content */
.hero-content-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 1200px;
  padding: 5rem;
  background: rgba(0, 0, 0, 0.5); /* Reduced overlay opacity */
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.hero-content-overlay h1 {
  font-family: 'Playfair Display', serif;
  font-size: 6rem;
  font-weight: 700;
  line-height: 1.1;
  background: linear-gradient(45deg, #ffffff 30%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  animation: glowText 2s infinite alternate;
}

.hero-content-overlay .super-sale {
  font-family: 'Montserrat', sans-serif;
  font-size: 3.5rem;
  font-weight: 800;
  text-transform: uppercase;
  background: linear-gradient(45deg, #ffd700, #ff4d4d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 2px;
  margin: 2rem 0;
}

.hero-content-overlay .hero-text {
  font-family: 'Roboto', sans-serif;
  font-size: 1.8rem;
  font-weight: 300;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 2rem 0;
}

.cta-btn {
  font-family: 'Montserrat', sans-serif;
  padding: 1.5rem 4rem;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 2px;
  color: #000;
  background: #ffd700;
  border: none;
  transition: all 0.4s ease;
}

.cta-btn:hover {
  background: #ffffff;
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(255, 215, 0, 0.3);
}

/* Category Icons */
.category-icons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: -4rem auto 0;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
}

.category-item {
  text-align: center;
  padding: 1.5rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.3s ease;
}

.category-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.category-icon svg {
  fill: #ffd700;
  transition: all 0.3s ease;
}

.category-icon span {
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
}

.category-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 215, 0, 0.1);
}

.category-item:hover svg {
  fill: #ffffff;
  transform: scale(1.1);
}

/* Features Section */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  padding: 6rem 4rem;
  background: #0f0f0f;
}

.feature-item {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  padding: 2rem;
  transition: transform 0.5s ease;
}

.feature-image-container {
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.feature-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.feature-item:hover {
  transform: translateY(-10px);
}

.feature-item:hover .feature-image {
  transform: scale(1.05);
}

.feature-item h3 {
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffd700;
}

.feature-item p {
  font-family: 'Roboto', sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

/* Add these keyframe animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Update the font imports at the top of style section */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800&family=Playfair+Display:wght@700&family=Roboto:wght@300;400;500&display=swap&subset=vietnamese');

/* Update the hero content h1 styles */
.hero-content-overlay h1 {
  font-family: 'Montserrat', 'Roboto', system-ui, -apple-system, sans-serif;
  font-size: 6rem;
  font-weight: 700;
  line-height: 1.1;
  background: linear-gradient(45deg, #ffffff 30%, #ffd700 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  animation: glowText 2s infinite alternate;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.hero-content-overlay .super-sale {
  animation: fadeInUp 1s ease 0.3s forwards;
  opacity: 0;
}

.hero-content-overlay .hero-text {
  animation: slideInRight 1s ease 0.6s forwards;
  opacity: 0;
}

.hero-content-overlay .cta-btn {
  animation: fadeInUp 1s ease 0.9s forwards;
  opacity: 0;
}

/* Update overlay transition */
.hero-content-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 1200px;
  padding: 5rem;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeIn 1.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    backdrop-filter: blur(0);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(8px);
  }
}

.cta-btn:hover {
  background: #ffffff;
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(255, 215, 0, 0.3);
}

/* Category Icons */
.category-icons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: -4rem auto 0;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
}

.category-item {
  text-align: center;
  padding: 1.5rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.3s ease;
}

.category-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.category-icon svg {
  fill: #ffd700;
  transition: all 0.3s ease;
}

.category-icon span {
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
}

.category-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 215, 0, 0.1);
}

.category-item:hover svg {
  fill: #ffffff;
  transform: scale(1.1);
}

/* Features Section */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  padding: 6rem 4rem;
  background: #0f0f0f;
}

.feature-item {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  padding: 2rem;
  transition: transform 0.5s ease;
}

.feature-image-container {
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.feature-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.feature-item:hover {
  transform: translateY(-10px);
}

.feature-item:hover .feature-image {
  transform: scale(1.05);
}

.feature-item h3 {
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffd700;
}

.feature-item p {
  font-family: 'Roboto', sans-serif;
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

/* Social Media */
.social-media {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  display: flex;
  gap: 1rem;
}

.social-icon {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffd700;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-5px);
  background: #ffffff;
}

/* Add these font imports at the top of your style section */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800&family=Playfair+Display:wght@700&family=Roboto:wght@300;400;500&display=swap');

/* Animations */
@keyframes glowText {
  0% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.3); }
  100% { text-shadow: 0 0 40px rgba(255, 215, 0, 0.6); }
}

@keyframes scaleAnimation {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-content-overlay h1 { font-size: 4.5rem; }
  .hero-content-overlay .super-sale { font-size: 3rem; }
  .hero-content-overlay .hero-text { font-size: 1.5rem; }
}

@media (max-width: 768px) {
  .hero-content-overlay {
    padding: 3rem;
  }
  .hero-content-overlay h1 { font-size: 3.5rem; }
  .hero-content-overlay .super-sale { font-size: 2.5rem; }
  .hero-content-overlay .hero-text { font-size: 1.2rem; }
  .features { padding: 4rem 2rem; }
  .category-icons { padding: 4rem 2rem; }
}
</style>
