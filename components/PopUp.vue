<!-- PopUp.vue -->
<template>
    <div v-if="showPopup" class="popup-overlay" @click.self="closePopup">
      <div class="popup-container">
        <div class="popup-content">
          <button class="close-button" @click="closePopup">×</button>
          <h2 class="popup-title">Welcome to TutorLink</h2>
          <p class="popup-message">Struggling with your subjects?</p>
          <p class="popup-message">Then you have come to the right place.</p>
          <button class="action-button" @click="closePopup">Get Started</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const showPopup = ref(false)
  
  function closePopup() {
    showPopup.value = false
    // Save to localStorage so it doesn't show again in this session
    localStorage.setItem('tutorlink_popup_shown', 'true')
  }
  
  onMounted(() => {
    // Check if the popup has been shown before
    const popupShown = localStorage.getItem('tutorlink_popup_shown')
    
    // Show popup after a short delay if it hasn't been shown before
    if (!popupShown) {
      setTimeout(() => {
        showPopup.value = true
      }, 1500) // 1.5 second delay
    }
  })
  </script>
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-in-out;
  }
  
  .popup-container {
    width: 90%;
    max-width: 500px;
    background: linear-gradient(140deg, #001f3f, #00509e);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    transform: translateY(0);
    animation: slideUp 0.5s ease-in-out;
  }
  
  .popup-content {
    padding: 2.5rem;
    text-align: center;
    position: relative;
    color: white;
  }
  
  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background: transparent;
    border: none;
    font-size: 28px;
    color: white;
    cursor: pointer;
    transition: transform 0.3s;
  }
  
  .close-button:hover {
    transform: rotate(90deg);
  }
  
  .popup-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: white;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }
  
  .popup-message {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .action-button {
    margin-top: 1.5rem;
    padding: 0.75rem 2.5rem;
    background-color: #f5a623;
    color: #001f3f;
    border: none;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .action-button:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  @media (max-width: 640px) {
    .popup-title {
      font-size: 2rem;
    }
    
    .popup-message {
      font-size: 1.1rem;
    }
  }
  </style>