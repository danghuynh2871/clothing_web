<template>
  <div class="checkout">
  <h1>Thanh toán</h1>
    <order-form @update-form="updateOrderForm" />
    <cart-summary :cart="cart" />
    
    <!-- Add stock warning messages -->
    <div v-if="stockWarnings.length > 0" class="stock-warnings">
      <p v-for="(warning, index) in stockWarnings" :key="index" class="warning-text">
        {{ warning }}
      </p>
    </div>
    
    <div class="order-actions">
      <button 
        class="confirm-order-btn" 
        @click="confirmOrder"
        :disabled="!canOrder || stockWarnings.length > 0">
        {{ loading ? 'Đang xử lý...' : 'Xác nhận đặt hàng' }}
      </button>
      <p v-if="!formData.shippingAddress" class="warning-text">
        * Vui lòng nhập địa chỉ giao hàng
      </p>
    </div>
  </div>
</template>

<script>
import OrderForm from '@/components/order/OrderForm.vue';
import CartSummary from '@/components/cart/CartSummary.vue';
import axios from '@/plugins/axios';

export default {
  components: { OrderForm, CartSummary },
  data() {
    return {
      loading: false,
      formData: {
        shippingAddress: '',
        paymentMethod: 'COD'
      },
      stockWarnings: []
    }
  },
  computed: {
    cart() {
      return this.$store.state.cart.cart;
    },
    canOrder() {
      return !this.loading && 
             this.cart?.items?.length > 0 && 
             this.formData.shippingAddress.trim() !== '';
    }
  },
  methods: {
    updateOrderForm(formData) {
      this.formData = { ...formData };
      console.log('Updated form data:', this.formData); // Debug log
    },
    
    // Check stock availability for all cart items
    async checkStockAvailability() {
      this.stockWarnings = [];
      
      if (!this.cart || !this.cart.items || !this.cart.items.length) {
        return true;
      }
      
      try {
        // Fetch current stock from MongoDB for each product
        const stockChecks = await Promise.all(
          this.cart.items.map(async (item) => {
            const response = await axios.get(`/products/${item.product._id}`);
            return {
              cartItem: item,
              currentStock: response.data.quantity,
              name: response.data.name
            };
          })
        );

        // Check stock levels
        for (const check of stockChecks) {
          const { cartItem, currentStock, name } = check;
          
          if (currentStock === 0) {
            this.stockWarnings.push(`Sản phẩm "${name}" đã hết hàng.`);
            continue;
          }
          
          if (cartItem.quantity > currentStock) {
            this.stockWarnings.push(
              `Sản phẩm "${name}" chỉ còn ${currentStock} sản phẩm (bạn đang đặt ${cartItem.quantity}).`
            );
          }
        }
        
        return this.stockWarnings.length === 0;
      } catch (error) {
        console.error('Error checking stock:', error);
        this.$toast.error('Không thể kiểm tra số lượng sản phẩm.');
        return false;
      }
    },
    
    async confirmOrder() {
      const stockAvailable = await this.checkStockAvailability();
      if (!stockAvailable) {
        this.$toast.error('Vui lòng kiểm tra lại số lượng sản phẩm trong giỏ hàng.');
        return;
      }
      
      this.loading = true;
      try {
        const orderData = {
          items: this.cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
            name: item.product.name
          })),
          shippingAddress: this.formData.shippingAddress,
          paymentMethod: this.formData.paymentMethod,
          totalAmount: this.cart.total,
          status: 'pending'
        };

        // Update product quantities in MongoDB
        await Promise.all(
          orderData.items.map(async (item) => {
            // Get current product data
            const productResponse = await axios.get(`/products/${item.product}`);
            const currentProduct = productResponse.data;
            
            // Calculate new quantity
            const newQuantity = currentProduct.quantity - item.quantity;
            
            // Update product in MongoDB
            await axios.put(`/products/${item.product}`, {
              quantity: newQuantity,
              status: newQuantity === 0 ? 'outOfStock' : 'inStock'
            });
          })
        );
        
        // Create the order
        const response = await this.$store.dispatch('order/createOrder', orderData);
        
        // Clear cart after successful order
        await this.$store.dispatch('cart/clearCart');
        this.$toast.success('Đặt hàng thành công!');
        this.$router.push('/orders');
      } catch (error) {
        console.error('Order error:', error);
        this.$toast.error(error.response?.data?.message || 'Đặt hàng thất bại!');
      } finally {
        this.loading = false;
      }
    }
  },
  // Add created hook to check stock when component loads
  created() {
    this.checkStockAvailability();
  },
  // Watch for cart changes to recheck stock
  watch: {
    'cart.items': {
      handler() {
        this.checkStockAvailability();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.checkout {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.confirm-order-btn {
  background-color: #1a73e8;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.confirm-order-btn:hover {
  background-color: #1557b0;
}

.confirm-order-btn:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.warning-text {
  color: #ff5252;
  font-size: 0.9rem;
  margin-top: 8px;
}

.order-actions {
  margin-top: 20px;
  text-align: center;
}

/* Add styles for stock warnings */
.stock-warnings {
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #fff3cd;
  border-left: 4px solid #ffc107;
  border-radius: 4px;
}

/* Add new class for smaller images */
.main-image {
  width: 40px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid #eee;
  display: block;
  margin: 0 auto;
}
</style>