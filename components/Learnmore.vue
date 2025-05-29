<template>
    <div v-if="isVisible" class="learn-more-overlay">
      <div class="learn-more-container">
        <div class="learn-more-content">
          <button class="close-button" @click="$emit('close')">×</button>
          <h2 class="learn-more-title">About TutorLink</h2>
          <div class="learn-more-text">
            <p>
              Unlock your potential with <strong>TutorLink</strong>, the global platform connecting students with expert tutors from every corner of the world. Whether you're looking for a mentor nearby or a seasoned guide from across the globe, we bring diverse knowledge, unique accents, and personalized learning right to your screen. Choose your tutor, start your journey, and shape a brighter future with us. 🌟
            </p>
          </div>
          <div class="learn-more-buttons">
            <button class="action-button" @click="$emit('close')">Got it!</button>
            <NuxtLink to="/tutors" class="secondary-button">
              Find a tutor now
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    isVisible: {
      type: Boolean,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .learn-more-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .learn-more-container {
    width: 90%;
    max-width: 700px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    overflow: hidden;
  }
  
  .learn-more-content {
    padding: 24px;
    position: relative;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
  }
  
  .learn-more-title {
    margin-top: 0;
    margin-bottom: 16px;
    color: #333;
    font-size: 25px;
  }
  
  .learn-more-text p {
    line-height: 2.0;
    color: #444;
    margin-bottom: 20px;
  }
  
  .learn-more-buttons {
    display: flex;
    gap: 12px;
    margin-top: 20px;
  }
  
  .action-button {
    padding: 10px 20px;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .action-button:hover {
    background-color: #4338ca;
  }
  
  .secondary-button {
    padding: 10px 20px;
    background-color: #f3f4f6;
    color: #374151;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }
  
  .secondary-button:hover {
    background-color: #e5e7eb;
  }
  </style>
  