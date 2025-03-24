import api from './api';

export default {
  getProducts() {
    return api.get('/products')
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        throw error;
      });
  },
  
  getProduct(id) {
    return api.get(`/products/${id}`).then(res => res.data);
  }
};
