<template>
  <div class="orders">
    <h1>Đơn hàng của bạn</h1>
    <order-list :orders="orders" :loading="loading" />
  </div>
</template>

<script>
import OrderList from '@/components/order/OrderList.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: { OrderList },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState({
      orders: state => state.order.orders
    })
  },
  methods: {
    ...mapActions({
      fetchOrders: 'order/fetchOrders'
    })
  },
  async created() {
    try {
      this.loading = true;
      console.log('Fetching orders...');
      await this.fetchOrders();
      console.log('Orders fetched:', this.orders);
    } catch (error) {
      console.error('Error details:', error);
      this.$toast.error('Không thể tải đơn hàng: ' + (error.response?.data?.message || error.message));
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.orders {
  padding: 20px;
  margin-top: 60px;
  min-height: calc(100vh - 80px);
}
</style>