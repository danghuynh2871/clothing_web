import api from './api';

export default {
  getCart() {
    return api.get('/cart').then(res => res.data);
  },
  addToCart(item) {
    return api.post('/cart', item).then(res => res.data);
  },
  updateCartItem(productId, quantity) {
    return api.put('/cart', { productId, quantity }).then(res => res.data);
  },
  removeFromCart(productId) {
    return api.delete(`/cart/${productId}`).then(res => res.data);
  },
};