<template>
  <div class="order-form">
    <h2>Thông tin đặt hàng</h2>
    <div class="form-container">
      <div class="form-group">
        <label>Họ và tên người nhận</label>
        <input 
          v-model="form.fullName" 
          type="text" 
          required
          @input="updateForm"
          placeholder="Nhập họ và tên"
        >
      </div>

      <div class="form-group">
        <label>Số điện thoại</label>
        <input 
          v-model="form.phone" 
          type="tel" 
          required
          @input="updateForm"
          placeholder="Nhập số điện thoại"
        >
      </div>

      <div class="form-group">
        <label>Email</label>
        <input 
          v-model="form.email" 
          type="email" 
          required
          @input="updateForm"
          placeholder="Nhập email"
        >
      </div>

      <div class="form-group">
        <label>Phương thức thanh toán</label>
        <select 
          v-model="form.paymentMethod" 
          required
          @change="updateForm"
        >
          <option value="COD">Thanh toán khi nhận hàng</option>
          <option value="Banking">Chuyển khoản ngân hàng</option>
        </select>
      </div>

      <div class="form-group full-width">
        <label>Địa chỉ giao hàng</label>
        <textarea 
          v-model="form.shippingAddress" 
          required
          @input="updateForm"
          placeholder="Nhập địa chỉ chi tiết"
        ></textarea>
      </div>

      <div class="form-group full-width">
        <label>Ghi chú đơn hàng</label>
        <textarea 
          v-model="form.note" 
          @input="updateForm"
          placeholder="Nhập ghi chú nếu có"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        fullName: '',
        phone: '',
        email: '',
        shippingAddress: '',
        note: '',
        paymentMethod: 'COD',
      }
    };
  },
  methods: {
    updateForm() {
      this.$emit('update-form', this.form);
    }
  }
};
</script>

<style scoped>
.order-form {
  max-width: 1000px;
  margin: 80px auto;
  padding: 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  margin-bottom: 0;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

h2 {
  color: #333;
  margin-bottom: 25px;
  text-align: center;
  font-size: 24px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

input, select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #1a73e8;
  box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
}

input::placeholder, textarea::placeholder {
  color: #999;
}

select {
  background-color: white;
  cursor: pointer;
}

button {
  background-color: #1a73e8;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1557b0;
}

button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .order-form {
    padding: 20px;
    margin: 60px 10px;
  }

  .form-container {
    grid-template-columns: 1fr;
  }
}
</style>