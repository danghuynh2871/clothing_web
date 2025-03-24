<template>
  <header class="header">
    <nav class="nav-container">
      <div class="brand">
        <router-link to="/" class="logo-link">
          <svg class="logo-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span class="brand-name">Shopping MÊ</span>
        </router-link>
      </div>
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Tìm kiếm sản phẩm..." 
          class="search-input"
          @keyup.enter="performSearch"
        >
        <button class="search-btn" @click="performSearch">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </button>
      </div>
      <div class="nav-links" :class="{ 'active': menuOpen }">
        <!-- Home link as text -->
        <router-link to="/" class="nav-item text-link" @click="closeMenu">
          Trang chủ
        </router-link>
        
        <!-- Products link with dropdown -->
        <div class="dropdown-container">
          <router-link to="/products" class="nav-item text-link" @click="closeMenu">
            Sản phẩm
          </router-link>
          <div class="dropdown-menu">
            <router-link to="/men" class="dropdown-item" @click="closeMenu">Nam</router-link>
            <router-link to="/women" class="dropdown-item" @click="closeMenu">Nữ</router-link>
          </div>
        </div>
        
        <!-- Other links as icons -->
        <router-link 
          v-for="link in filteredLinks.filter(link => link.path !== '/' && link.path !== '/products' && link.path !== '/men' && link.path !== '/women')" 
          :key="link.path" 
          :to="link.path" 
          class="nav-item"
          @click="closeMenu"
        >
          <span class="nav-icon">
            <!-- Cart icon -->
            <template v-if="link.path === '/cart'">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              <span v-if="cartItemCount" class="cart-count">{{ cartItemCount }}</span>
            </template>
            
            <!-- Orders icon -->
            <svg v-if="link.path === '/orders'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <path d="M14 2v6h6"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
              <path d="M10 9H8"></path>
            </svg>
            
            <!-- Login icon -->
            <svg v-if="link.path === '/login'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            
            <!-- Register icon -->
            <svg v-if="link.path === '/register'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M19 8v6"></path>
              <path d="M22 11h-6"></path>
            </svg>
          </span>
          <span class="tooltip">{{ link.text }}</span>
        </router-link>
        <button 
          v-if="isAuthenticated" 
          class="logout-btn" 
          @click="logout"
          @click.stop="closeMenu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <path d="m16 17 5-5-5-5"></path>
            <path d="M21 12H9"></path>
          </svg>
          <span class="tooltip">Đăng xuất</span>
        </button>
      </div>
      <div class="menu-toggle" @click="toggleMenu">
        <span class="hamburger" :class="{ 'open': menuOpen }"></span>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'ModernHeader',
  data() {
    return {
      menuOpen: false,
      searchQuery: '', // Biến lưu trữ giá trị tìm kiếm
      navLinks: [
        { path: '/', text: 'Trang chủ', auth: false },
        { path: '/products', text: 'Sản phẩm', auth: false },
        { path: '/cart', text: 'Giỏ hàng', auth: false, icon: true },
        { path: '/orders', text: 'Đơn hàng', auth: false },
        { path: '/login', text: 'Đăng nhập', auth: false, hideIfAuth: true, icon: true },
      ],
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated'];
    },
    filteredLinks() {
      return this.navLinks.filter(link => 
        (!link.auth || this.isAuthenticated) && 
        (!link.hideIfAuth || !this.isAuthenticated)
      );
    },
    cartItemCount() {
      const cart = this.$store.state.cart.cart;
      return cart ? cart.items.length : 0;
    }
  },
  created() {
    // Fetch cart data if user is authenticated
    if (this.isAuthenticated) {
      this.$store.dispatch('cart/fetchCart');
    }
  },
  watch: {
    // Watch for authentication changes
    isAuthenticated(newVal) {
      if (newVal) {
        this.$store.dispatch('cart/fetchCart');
      }
    }
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('auth/logout');
        this.$store.commit('cart/setCart', null);
        this.$toast.success('Đã đăng xuất thành công!');
        this.$router.push('/login');
      } catch (error) {
        this.$toast.error('Đăng xuất thất bại, vui lòng thử lại!');
      }
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
    performSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({ path: '/products', query: { search: this.searchQuery } });
        this.searchQuery = ''; // Reset sau khi tìm kiếm
        this.closeMenu();
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap');

.header {
  background: #3a3a3a; /* Solid background color */
  color: #ffffff;
  padding: 1.2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3); /* Enhanced shadow for prominence */
  position: fixed; /* Fixed position to attach to the top */
  top: 0;
  left: 0px; /* Ensure it starts from the left */
  right: 0; /* Ensure it spans to the right */
  width: 100%; /* Full width to span the viewport */
  z-index: 1000;
  border-bottom: 2px solid #505050; /* Border to separate from content */
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Poppins', sans-serif;
}

/* Brand Logo */
.brand {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #fff;
  transition: transform 0.3s ease;
}

.logo-link:hover {
  transform: scale(1.05);
}

.logo-icon {
  width: 32px;
  height: 32px;
  margin-right: 12px;
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
  transition: transform 0.5s ease, filter 0.5s ease;
}

.logo-link:hover .logo-icon {
  transform: rotate(360deg);
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.8));
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #ffffff; /* Solid text color */
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Search Bar */
.search-container {
  flex: 1;
  max-width: 500px;
  margin: 0 2rem;
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-input:focus {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3), inset 0 0 5px rgba(0, 0, 0, 0.1);
}

.search-btn {
  position: absolute;
  left: 10px;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #fff;
  transition: transform 0.3s ease;
}

.search-btn:hover {
  transform: scale(1.1);
}

/* Navigation Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* Text links */
.text-link {
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  padding: 0.5rem 0;
}

.text-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  transition: width 0.3s ease;
}

.text-link:hover::after {
  width: 100%;
}

/* Dropdown styles */
.dropdown-container {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: rgba(80, 80, 80, 0.95);
  min-width: 180px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 100;
  backdrop-filter: blur(5px);
  overflow: hidden;
}

.dropdown-container:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(5px);
}

.dropdown-item {
  display: block;
  padding: 12px 20px;
  color: #f5f5f5;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
}

.dropdown-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(to right, rgba(255, 255, 255, 0.1), transparent);
  transition: width 0.3s ease;
  z-index: -1;
}

.dropdown-item:hover::before {
  width: 100%;
}

.dropdown-item:hover {
  color: #ffffff;
  padding-left: 25px;
}

.nav-item {
  color: #e0e0e0;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  position: relative;
  padding: 0.5rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.nav-item:hover {
  color: #ffffff;
  transform: translateY(-2px);
}

.nav-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.nav-icon svg {
  transition: transform 0.3s ease, filter 0.3s ease;
}

.nav-item:hover .nav-icon svg {
  transform: scale(1.1);
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
}

.tooltip {
  visibility: hidden;
  position: absolute;
  bottom: -35px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.tooltip::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 5px 5px 5px;
  border-style: solid;
  border-color: transparent transparent rgba(0, 0, 0, 0.8) transparent;
}

.nav-item:hover .tooltip,
.logout-btn:hover .tooltip {
  visibility: visible;
  opacity: 1;
  transform: translateX(-50%) translateY(-5px);
}

.logout-btn {
  background: linear-gradient(135deg, #ff5252, #ff7675);
  border: none;
  color: #ffffff;
  padding: 0.5rem;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.logout-btn:hover {
  background: linear-gradient(135deg, #ff7675, #ff5252);
  transform: translateY(-3px) rotate(5deg);
  box-shadow: 0 5px 15px rgba(255, 82, 82, 0.4);
}

/* Hamburger Menu */
.menu-toggle {
  display: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  justify-content: center;
  align-items: center;
  transition: background 0.3s ease;
}

.menu-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
}

.hamburger {
  width: 24px;
  height: 2px;
  background: #fff;
  position: relative;
  transition: all 0.3s ease;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background: #fff;
  transition: all 0.3s ease;
}

.hamburger::before {
  top: -8px;
}

.hamburger::after {
  bottom: -8px;
}

.hamburger.open {
  background: transparent;
}

.hamburger.open::before {
  transform: rotate(45deg) translate(5px, 6px);
}

.hamburger.open::after {
  transform: rotate(-45deg) translate(5px, -6px);
}

/* Cart count badge */
.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: linear-gradient(135deg, #ff5252, #ff7675);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border: 2px solid #505050;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(255, 82, 82, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .header {
    padding: 0.8rem;
  }

  .search-container {
    display: none; /* Hide search on mobile */
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #3a3a3a, #505050);
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    transform: translateY(-100%);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  .nav-links.active {
    transform: translateY(0);
  }

  .menu-toggle {
    display: flex;
  }

  .dropdown-menu {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    background-color: rgba(60, 60, 60, 0.5);
    box-shadow: none;
    margin-left: 20px;
    margin-top: 10px;
    border-radius: 8px;
    padding: 5px 0;
  }
  
  .dropdown-item {
    padding: 10px 15px;
  }

  .text-link::after {
    display: none;
  }

  .logout-btn {
    margin-top: 10px;
    width: 100%;
    border-radius: 8px;
    justify-content: flex-start;
    padding: 10px 15px;
    background: rgba(255, 82, 82, 0.2);
  }

  .logout-btn svg {
    margin-right: 10px;
  }

  .tooltip {
    display: none;
  }
}

@media (max-width: 480px) {
  .brand-name {
    font-size: 1.25rem;
  }

  .logo-icon {
    width: 24px;
    height: 24px;
  }
}
</style>