<template>
  <div class="welcome-container">
    <!-- Welcome Popup -->
    <transition name="popup-transition">
      <div v-if="showWelcomePopup" class="welcome-popup">
        <div class="popup-content">
          <h2>Hi there! 👋</h2>
          <p>Welcome to TutorLink, your gateway to discovering and sharing knowledge. Connect with expert tutors or share your expertise today!</p>
          <button @click="closeWelcomePopup" class="get-started-btn">Let's Go</button>
        </div>
      </div>
    </transition>

    <!-- Main Box -->
    <div class="main-box">
      <!-- Logo and Name -->
      <div class="logo-container">
        <div class="logo">
          <span class="logo-letter">T</span>
        </div>
        <h1 class="logo-text">TutorLink</h1>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <NuxtLink to="/login" class="login-btn">Login</NuxtLink>
        <NuxtLink to="/register" class="register-btn">Register</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const showWelcomePopup = ref(false);

onMounted(() => {
  const hasSeenWelcomePopup = sessionStorage.getItem('hasSeenWelcomePopup');
  if (!hasSeenWelcomePopup) {
    showWelcomePopup.value = true;
    sessionStorage.setItem('hasSeenWelcomePopup', 'true');
  }
});

function closeWelcomePopup() {
  showWelcomePopup.value = false;
}
</script>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: url('/welcome.jpg');
  background-color: rgba(255, 255, 255, 0.6); /* Adjust transparency here */
  background-blend-mode: overlay; /* Blend with background color */
  background-size: cover;
  background-position: center;
  padding: 20px;
  text-align: center;
}

/* Main Box Styling */
.main-box {
  background-color: white;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 400px;
  text-align: center;
  border: 4px solid #3498db; /* Blue border */
}

/* Logo Styling */
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.logo {
  width: 80px;
  height: 80px;
  background-color: #3498db;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logo-letter {
  color: white;
  font-size: 48px;
  font-weight: bold;
}

.logo-text {
  font-size: 2.5rem;
  color: #3498db;
  margin: 0;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.login-btn, 
.register-btn {
  padding: 12px 24px;
  background-color: #3498db;
  color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;
}

.login-btn:hover, 
.register-btn:hover {
  background-color: #2980b9;
  transform: scale(1.05);
}

/* Welcome Popup */
.welcome-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.popup-content h2 {
  color: #3498db;
  margin-bottom: 20px;
}

.popup-content p {
  color: #34495e;
  margin-bottom: 30px;
  line-height: 1.6;
}

/* Popup Transition */
.popup-transition-enter-active,
.popup-transition-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.popup-transition-enter-from,
.popup-transition-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.popup-transition-enter-to,
.popup-transition-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
