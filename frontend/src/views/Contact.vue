<template>
  <div class="contact-container">
    <div class="contact-header">
      <h1>Contact Us</h1>
      <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
    </div>

    <div class="contact-content">
      <div class="contact-form">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" v-model="formData.name" required>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="formData.email" required>
          </div>

          <div class="form-group">
            <label for="subject">Subject</label>
            <input type="text" id="subject" v-model="formData.subject" required>
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" v-model="formData.message" rows="5" required></textarea>
          </div>

          <button type="submit" class="submit-btn">Send Message</button>
        </form>
      </div>

      <div class="contact-info">
        <div class="info-item">
          <i class="fas fa-map-marker-alt"></i>
          <div>
            <h3>Address</h3>
            <p>123 Fashion Street, District 1, Ho Chi Minh City</p>
          </div>
        </div>

        <div class="info-item">
          <i class="fas fa-phone"></i>
          <div>
            <h3>Phone</h3>
            <p>+84 123 456 789</p>
          </div>
        </div>

        <div class="info-item">
          <i class="fas fa-envelope"></i>
          <div>
            <h3>Email</h3>
            <p>support@yourstore.com</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // Handle form submission here
      console.log('Form submitted:', this.formData)
      // Reset form after submission
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  }
}
</script>

<style scoped>
.contact-container {
  max-width: 1200px;
  margin: 80px auto 0; /* Added margin-top to account for fixed header */
  padding: 60px 20px;
  background-color: #f8f9fa;
  min-height: calc(100vh - 80px); /* Ensures minimum height considering header */
}

.contact-header {
  text-align: center;
  margin-bottom: 60px;
}

.contact-header h1 {
  font-size: 2.8em;
  color: #2c3e50;
  margin-bottom: 20px;
  font-weight: 600;
  position: relative;
}

.contact-header h1::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #3498db;
}

.contact-header p {
  color: #5a6a7e;
  font-size: 1.2em;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.contact-content {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 50px;
}

.contact-form {
  background: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.form-group {
  margin-bottom: 25px;
}

label {
  display: block;
  margin-bottom: 10px;
  color: #2c3e50;
  font-weight: 500;
  font-size: 0.95em;
}

input, textarea {
  width: 100%;
  padding: 14px;
  border: 2px solid #e1e8ef;
  border-radius: 8px;
  font-size: 1em;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  background-color: #3498db;
  color: white;
  padding: 14px 35px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: 500;
  transition: all 0.3s ease;
  width: 100%;
}

.submit-btn:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
}

.contact-info {
  padding: 30px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 35px;
  padding: 20px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.info-item:hover {
  background-color: #f8f9fa;
  transform: translateX(5px);
}

.info-item i {
  font-size: 1.8em;
  color: #3498db;
  margin-right: 20px;
  margin-top: 5px;
}

.info-item h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 1.2em;
  font-weight: 600;
}

.info-item p {
  margin: 0;
  color: #5a6a7e;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .contact-info {
    order: -1;
  }

  .contact-header h1 {
    font-size: 2.2em;
  }

  .contact-form, .contact-info {
    padding: 25px;
  }
}
</style>