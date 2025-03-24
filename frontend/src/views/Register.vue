<template>
  <div class="register">
    <div class="register-wrapper">
      <div class="register-header">
        <h1>Create Your Account</h1>
        <p>Join us and explore the latest fashion trends!</p>
      </div>
      <register-form @register-success="handleRegisterSuccess" />
    </div>
  </div>
</template>

<script>
import RegisterForm from '@/components/auth/RegisterForm.vue';

export default {
  components: { RegisterForm },
  methods: {
    handleRegisterSuccess() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url('https://lavendermedia.vn/wp-content/uploads/2019/04/word-image-11.png') no-repeat center center;
  background-size: cover;
}

.register-wrapper {
  max-width: 400px;
  width: 100%;
  padding: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.register-header h1 {
  font-size: 1.8rem;
  color: #424242;
  margin-bottom: 10px;
}

.register-header p {
  font-size: 0.95rem;
  color: #757575;
  margin-bottom: 20px;
}

@media (max-width: 480px) {
  .register-wrapper {
    padding: 20px;
  }
}
</style>