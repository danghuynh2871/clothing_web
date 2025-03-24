<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="login-header">
        <h1>Welcome Back!</h1>
        <p>Sign in to continue exploring the latest fashion trends.</p>
      </div>
      <login-form @login-success="handleLoginSuccess" />
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue';

export default {
  components: { LoginForm },
  methods: {
    async handleLoginSuccess() {
      const redirect = this.$route.query.redirect || '/';
      try {
        await this.$router.push(redirect);
      } catch (error) {
        console.error('Navigation error:', error);
      }
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('https://lavendermedia.vn/wp-content/uploads/2019/04/word-image-11.png') no-repeat center center;
  background-size: cover;
}

.login-wrapper {
  max-width: 400px;
  width: 100%;
  padding: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.login-wrapper input {
  width: 100%;
  max-width: 300px; /* Limit the input field width */
  margin: 0 auto;
}

.login-header h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 10px;
}

.login-header p {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 20px;
}

@media (max-width: 480px) {
  .login-wrapper {
    padding: 20px;
  }
}
</style>