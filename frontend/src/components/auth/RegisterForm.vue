<template>
  <div class="register-container">
    <h2 class="form-title">REGISTER QUICK</h2>
    <form @submit.prevent="submitRegister" class="register-form" :class="{ 'shake': registerError }">
      <div class="form-group">
        <input
          v-model="form.username"
          type="text"
          required
          placeholder="Username"
          @input="clearError"
        >
        <span class="input-icon username-icon">
          <i class="fas fa-user"></i>
        </span>
      </div>

      <div class="form-group">
        <input
          v-model="form.email"
          type="email"
          required
          placeholder="E-mail"
          @input="clearError"
        >
        <span class="input-icon email-icon">
          <i class="fas fa-envelope"></i>
        </span>
      </div>

      <div class="form-group">
        <input
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          required
          placeholder="Password"
          @input="clearError"
        >
        <span class="input-icon password-icon" @click="showPassword = !showPassword">
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
      </div>

      <button type="submit" class="submit-btn" :disabled="loading">
        <span v-if="loading" class="loader"></span>
        <span v-else>Register</span>
      </button>

      <div class="extra-links">
        <router-link to="/login">Already have an account? Login</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
      },
      loading: false,
      registerError: false,
      showPassword: false,
    };
  },
  methods: {
    async submitRegister() {
      this.loading = true;
      this.registerError = false;
      try {
        await this.$store.dispatch('auth/register', this.form);
        this.$emit('register-success');
      } catch (error) {
        this.registerError = true;
        setTimeout(() => (this.registerError = false), 400);
        console.error('Register failed:', error);
        this.$toast.error(error.response?.data?.message || 'Registration error');
      } finally {
        this.loading = false;
      }
    },
    clearError() {
      this.registerError = false;
    },
  },
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  color: #424242;
  margin-bottom: 25px;
  font-weight: 500;
  letter-spacing: 1px;
}

.register-form {
  transition: transform 0.2s ease;
}

.register-form.shake {
  animation: shake 0.3s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
}

.form-group {
  margin-bottom: 1.25rem;
  position: relative;
}

input {
  width: 100%;
  padding: 12px;
  padding-right: 40px;
  border: 1px solid #d1d1d1;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  background-color: #ffffff;
  color: #424242;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  max-width: 280px; /* Adjust the maximum width */
  margin: 0 auto;
}

input:focus {
  border-color: #757575;
  box-shadow: 0 0 0 3px rgba(117, 117, 117, 0.1);
}

input::placeholder {
  color: #9e9e9e;
}

.input-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #757575;
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #616161;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease, transform 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #424242;
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background: #9e9e9e;
  cursor: not-allowed;
}

.loader {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.extra-links {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.extra-links a {
  color: #616161;
  text-decoration: none;
  transition: color 0.3s ease;
}

.extra-links a:hover {
  color: #424242;
  text-decoration: underline;
}
</style>