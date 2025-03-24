import orderService from '@/services/order.service';
import axios from '@/plugins/axios';  // Update this import to use the configured axios instance

const state = {
  orders: [],
  loading: false
};

const mutations = {
  setOrders(state, orders) {
    state.orders = orders;
  },
  setLoading(state, status) {
    state.loading = status;
  }
};

const actions = {
  async createOrder({ commit }, orderData) {
    try {
      commit('setLoading', true);
      const response = await axios.post('/orders', orderData);
      
      // Update product quantities after successful order
      for (const item of orderData.items) {
        const productResponse = await axios.get(`/products/${item.product}`);
        const product = productResponse.data;
        const newQuantity = Math.max(0, product.quantity - item.quantity);
        const updateData = { 
          quantity: newQuantity,
          status: newQuantity === 0 ? 'outOfStock' : 'inStock'
        };
        
        await axios.put(`/products/${item.product}`, updateData);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    } finally {
      commit('setLoading', false);
    }
  },
  async fetchOrders({ commit }) {
    commit('setLoading', true);
    commit('setError', null);
    try {
      const orders = await orderService.getOrders();
      commit('setOrders', orders);
      return orders;
    } catch (error) {
      commit('setError', error.message);
      throw error;
    } finally {
      commit('setLoading', false);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
