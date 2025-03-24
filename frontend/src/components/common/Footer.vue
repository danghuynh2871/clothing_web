<template>
  <footer class="footer">
    <!-- Add a decorative wave SVG -->
    <div class="footer-wave">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#1a1a1a" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>

    <div class="container">
      <div class="footer-content">
        <div class="footer-section about">
          <div class="logo">
            <svg class="logo-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <path d="M3 6h18"></path>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <h1 class="brand-name">Shopping MÊ</h1>
          </div>
          <p>Ẩm thực thời trang luôn đồng hành cùng bạn với những mẫu sản phẩm mới nhất, đỉnh nhất và giá tốt nhất.</p>
          <div class="social-links">
            <a href="#" v-for="icon in socialIcons" :key="icon.name" :class="icon.class" @click.prevent>
              <i :class="icon.icon"></i>
            </a>
          </div>
        </div>
        <div class="footer-section links">
          <h3>Liên kết</h3>
          <ul>
            <li v-for="link in navLinks" :key="link.path">
              <router-link :to="link.path">{{ link.text }}</router-link>
            </li>
          </ul>
        </div>
        <div class="footer-section contact">
          <h3>Thông tin liên hệ</h3>
          <p v-for="item in contactInfo" :key="item.text">
            <i :class="item.icon"></i> {{ item.text }}
          </p>
        </div>
        <div class="footer-section newsletter">
          <h3>Nhận thông báo và các ưu đãi</h3>
          <p>Đừng bỏ lỡ các ưu đãi và cập nhật mới nhất từ chúng tôi.</p>
          <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
            <input 
              type="email" 
              placeholder="Email của bạn..." 
              v-model="email" 
              required 
              @focus="inputFocused = true" 
              @blur="inputFocused = false"
            >
            <button type="submit" class="btn-subscribe" :disabled="loading">
              <span v-if="loading" class="spinner"></span>
              <span v-else>Đăng ký</span>
            </button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© {{ new Date().getFullYear() }} Sản phẩm của Chú Bé Đần ©</p>
      </div>
    </div>
    <!-- Add a gradient overlay -->
    <div class="footer-overlay"></div>
  </footer>
</template>

<script>
export default {
  name: 'ModernFooter',
  data() {
    return {
      email: '',
      loading: false,
      inputFocused: false,
      socialIcons: [
        { name: 'facebook', icon: 'fab fa-facebook-f', class: 'facebook' },
        { name: 'twitter', icon: 'fab fa-twitter', class: 'twitter' },
        { name: 'instagram', icon: 'fab fa-instagram', class: 'instagram' },
        { name: 'youtube', icon: 'fab fa-youtube', class: 'youtube' },
      ],
      navLinks: [
        { path: '/', text: 'Trang chủ' },
        { path: '/products', text: 'Sản phẩm' },
        { path: '/about', text: 'Về chúng tôi' },
        { path: '/contact', text: 'Liên hệ' },
        { path: '/policy', text: 'Chính sách' },
      ],
      contactInfo: [
        { icon: 'fas fa-phone-alt', text: '0123 456 789' },
        { icon: 'fas fa-envelope', text: 'shoppingme@gmail.com' },
        { icon: 'fas fa-map-marker-alt', text: '371 Nguyễn Kiệm, Gò Vấp, TPHCM' },
      ],
    };
  },
  methods: {
    async subscribeNewsletter() {
      this.loading = true;
      try {
        // Giả lập API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.$toast.success(`Đã đăng ký thành công với email: ${this.email}`);
        this.email = '';
      } catch (error) {
        this.$toast.error('Có lỗi xảy ra, vui lòng thử lại!');
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

.footer {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1a237e 100%);
  color: #f3f4f6;
  padding: 150px 0 40px;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
  box-shadow: 0 -20px 60px rgba(0, 0, 0, 0.3);
}

.footer-wave {
  position: absolute;
  top: -100px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
  filter: drop-shadow(0 -10px 10px rgba(0,0,0,0.1));
}

.footer-wave svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 150px;
  animation: waveFloat 20s ease-in-out infinite;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 80px; /* Reduced from 60px */
  margin-bottom: 60px; /* Reduced from 80px */
  position: relative;
  animation: fadeInUp 1s ease-out;
}

/* Adjust responsive breakpoints */
@media (max-width: 1200px) {
  .container {
    max-width: 960px;
  }
  
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .container {
    max-width: 100%;
    padding: 0 20px;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .footer {
    padding: 100px 0 30px;
  }
  
  .brand-name {
    font-size: 2rem; /* Reduced from 2.4rem */
  }
  
  .footer-section h3 {
    font-size: 1.3rem; /* Reduced from 1.5rem */
    margin-bottom: 25px; /* Reduced from 35px */
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }
  
  .social-links a {
    width: 45px; /* Reduced from 55px */
    height: 45px; /* Reduced from 55px */
  }
  
  .footer-content {
    gap: 30px;
  }
}

/* Logo and brand section */
.about .logo {
  margin-bottom: 30px;
  transform: scale(1.1);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 15px;
}

.about .logo:hover {
  transform: scale(1.15) rotate(5deg);
}

.logo-icon {
  filter: drop-shadow(0 0 10px rgba(96, 165, 250, 0.5));
}

.brand-name {
  font-size: 2.4rem;
  background: linear-gradient(45deg, #60a5fa, #c084fc, #f472b6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3);
  letter-spacing: -1px;
}

/* Enhanced social links */
.social-links {
  display: flex;
  gap: 20px;
  margin-top: 40px;
}

.social-links a {
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.social-links a::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.social-links a:hover::before {
  transform: translateY(0);
}

.social-links a:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 15px 30px rgba(0,0,0,0.3);
}

.social-links a.facebook:hover { 
  background: linear-gradient(45deg, #1877f2, #0099ff);
}
.social-links a.twitter:hover { 
  background: linear-gradient(45deg, #1da1f2, #00b4db);
}
.social-links a.instagram:hover { 
  background: linear-gradient(45deg, #f09433, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888);
}
.social-links a.youtube:hover { 
  background: linear-gradient(45deg, #ff0000, #ff3333);
}

/* Enhanced newsletter section */
.newsletter-form {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 100%; /* Changed from 320px to 100% */
  margin: 0; /* Removed auto margins */
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.newsletter p {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 10px; /* Adjusted margin */
}

.newsletter input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #fff;
  font-size: 0.95rem;
  outline: none;
}

.btn-subscribe {
  width: 100%;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 0.95rem;
}

.newsletter-form:focus-within {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
  border-color: #60a5fa;
  background: rgba(255, 255, 255, 0.08);
}

.newsletter input {
  width: 100%;
  padding: 15px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
}

.newsletter input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.btn-subscribe {
  width: 100%;
  padding: 15px 30px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(45deg, #60a5fa, #c084fc);
  background-size: 200% 200%;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: gradientShift 5s ease infinite;
}

.btn-subscribe:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(96, 165, 250, 0.4);
  background-position: right center;
}

/* Enhanced section headings */
.footer-section h3 {
  font-size: 1.5rem;
  margin-bottom: 35px;
  background: linear-gradient(45deg, #60a5fa, #c084fc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Enhanced contact section */
.contact p {
  padding: 15px 15px 15px 50px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
  position: relative;
}

.contact i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: linear-gradient(45deg, #60a5fa, #c084fc);
  color: white;
  font-size: 14px;
}

.contact p:hover i {
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 0 15px rgba(96, 165, 250, 0.4);
}

/* Enhanced footer bottom */
.footer-bottom {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  padding: 30px 0;
  margin-top: 60px;
  text-align: center; /* Add this line to center the text */
}

/* Responsive improvements */
@media (max-width: 1200px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
  
  .footer {
    padding: 100px 0 30px;
  }
  
  .container {
    padding: 0 20px;
  }
}
/* Links section */
.links ul {
  list-style: none;
  padding: 0;
}

.links a {
  color: #e2e8f0;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: inline-block;
  padding: 10px 0;
  position: relative;
  font-weight: 500;
}

.links a::before {
  content: '→';
  position: absolute;
  left: -20px;
  opacity: 0;
  transition: all 0.3s ease;
}

.links a:hover {
  color: #fff;
  transform: translateX(20px);
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.links a:hover::before {
  opacity: 1;
  left: 0;
}

.links li {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 5px;
}

.links li:last-child {
  border-bottom: none;
}
</style>