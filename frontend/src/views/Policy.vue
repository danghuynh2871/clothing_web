<template>
  <div class="policy-container">
    <h1 class="policy-title">Chính Sách Của Chúng Tôi</h1>
    
    <div class="policy-section">
      <h2>Chính Sách Vận Chuyển</h2>
      <div class="policy-content">
        <p>Chúng tôi sẽ xử lý và vận chuyển tất cả đơn hàng trong vòng 1-2 ngày làm việc. Thời gian giao hàng có thể thay đổi tùy theo vị trí của bạn:</p>
        <ul>
          <li>Vận chuyển nội địa: 2-5 ngày làm việc</li>
          <li>Vận chuyển quốc tế: 7-14 ngày làm việc</li>
        </ul>
      </div>
    </div>

    <div class="policy-section">
      <h2>Chính Sách Đổi Trả</h2>
      <div class="policy-content">
        <p>Chúng tôi mong muốn bạn hoàn toàn hài lòng với sản phẩm của mình. Chính sách đổi trả bao gồm:</p>
        <ul>
          <li>Thời hạn đổi trả trong vòng 30 ngày kể từ ngày nhận hàng</li>
          <li>Sản phẩm phải chưa qua sử dụng và còn nguyên trạng</li>
          <li>Phải còn nguyên tem mác sản phẩm</li>
        </ul>
      </div>
    </div>

    <div class="policy-section">
      <h2>Chính Sách Bảo Mật</h2>
      <div class="policy-content">
        <p>Chúng tôi tôn trọng và cam kết bảo vệ thông tin cá nhân của bạn. Chúng tôi thu thập và sử dụng dữ liệu của bạn để:</p>
        <ul>
          <li>Xử lý đơn hàng của bạn</li>
          <li>Cải thiện dịch vụ của chúng tôi</li>
          <li>Thông báo về các chương trình khuyến mãi và cập nhật mới</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Policy',
}
</script>

<style scoped>
.policy-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.policy-title {
  text-align: center;
  margin-bottom: 3rem;
  color: #333;
  font-size: 2.5rem;
}

.policy-section {
  margin-bottom: 2.5rem;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.policy-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.policy-content {
  color: #666;
  line-height: 1.6;
}

.policy-content p {
  margin-bottom: 1rem;
}

.policy-content ul {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.policy-content li {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .policy-title {
    font-size: 2rem;
  }

  .policy-section {
    padding: 1.5rem;
  }

  .policy-section h2 {
    font-size: 1.5rem;
  }
}
</style>