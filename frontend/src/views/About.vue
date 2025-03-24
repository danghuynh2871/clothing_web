<template>
  <div class="about-container">
    <div class="hero-section">
      <h1>Về Chúng Tôi</h1>
      <p class="subtitle">Thời trang đẳng cấp - Phong cách sống hiện đại</p>
    </div>

    <div class="content-section">
      <div class="story-block">
        <h2>Câu Chuyện Của Chúng Tôi</h2>
        <p>Được thành lập vào năm 2023, chúng tôi là điểm đến lý tưởng cho những người yêu thích thời trang và phong cách sống hiện đại. Với sứ mệnh mang đến những sản phẩm chất lượng cao và dịch vụ xuất sắc, chúng tôi cam kết đem lại trải nghiệm mua sắm tuyệt vời nhất cho khách hàng.</p>
      </div>

      <div class="values-grid">
        <div class="value-card">
          <i class="fas fa-heart"></i>
          <h3>Chất Lượng</h3>
          <p>Cam kết mang đến những sản phẩm chất lượng cao nhất</p>
        </div>
        <div class="value-card">
          <i class="fas fa-star"></i>
          <h3>Phong Cách</h3>
          <p>Luôn cập nhật xu hướng thời trang mới nhất</p>
        </div>
        <div class="value-card">
          <i class="fas fa-handshake"></i>
          <h3>Dịch Vụ</h3>
          <p>Chăm sóc khách hàng tận tâm và chuyên nghiệp</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 80px;
}

.hero-section {
  text-align: center;
  padding: 100px 0;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
              url('https://noithattugia.com/wp-content/uploads/2023/02/vi-sao-nen-thiet-ke-shop-quan-ao-nam.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
  border-radius: 15px;
  margin-bottom: 60px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.hero-section h1 {
  font-size: 4rem;
  margin-bottom: 20px;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 1.8rem;
  font-weight: 400;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.story-block {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.story-block h2 {
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #2c3e50;
  position: relative;
  padding-bottom: 15px;
}

.story-block h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: #4a90e2;
}

.story-block p {
  font-size: 1.2rem;
  line-height: 1.9;
  color: #34495e;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  padding: 40px 20px;
}

.value-card {
  text-align: center;
  padding: 40px 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(74, 144, 226, 0.1);
}

.value-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(74, 144, 226, 0.15);
  border-color: #4a90e2;
}

.value-card i {
  font-size: 3rem;
  color: #4a90e2;
  margin-bottom: 25px;
  transition: all 0.3s ease;
}

.value-card:hover i {
  transform: scale(1.1);
  color: #2980b9;
}

.value-card h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #2c3e50;
}

.value-card p {
  color: #34495e;
  line-height: 1.8;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 20px;
    background-attachment: scroll;
  }

  .hero-section h1 {
    font-size: 2.8rem;
  }

  .subtitle {
    font-size: 1.4rem;
  }

  .story-block h2 {
    font-size: 2rem;
  }

  .values-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>