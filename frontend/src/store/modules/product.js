import productService from '@/services/product.service';

const state = {
  products: [],
  product: null,
  loading: false,
  error: null
};

const getters = {
  allProducts: state => state.products,
  productById: state => id => state.products.find(product => product._id === id),
  currentProduct: state => state.product,
  loading: state => state.loading,
  error: state => state.error
};

const actions = {
  async fetchProducts({ commit }) {
    commit('setLoading', true);
    try {
      const response = await productService.getProducts();
      commit('setProducts', response);
      return response;
    } catch (error) {
      commit('setError', error.response ? error.response.data.message : error.message);
      throw error;
    } finally {
      commit('setLoading', false);
    }
  },
    
  async fetchProduct({ commit }, id) {
    commit('setLoading', true);
    try {
      const response = await productService.getProduct(id);
      commit('setProduct', response);
      return response;
    } catch (error) {
      commit('setError', error.response ? error.response.data.message : error.message);
      throw error;
    } finally {
      commit('setLoading', false);
    }
  }
};

const mutations = {
  setProducts(state, products) {
    state.products = products;
  },
  setProduct(state, product) {
    state.product = product;
  },
  setLoading(state, status) {
    state.loading = status;
  },
  setError(state, error) {
    state.error = error;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
