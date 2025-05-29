<template>
  <div id="map"></div>
</template>

<script setup>
import { onMounted } from 'vue';
const { $leaflet: L } = useNuxtApp();

const locations = [
  { name: "UK", lat: 51.5074, lng: -0.1278 },
  { name: "Germany", lat: 52.5200, lng: 13.4050 },
  { name: "USA", lat: 37.7749, lng: -122.4194 },
  { name: "Canada", lat: 43.65107, lng: -79.347015 },
  { name: "Netherlands", lat: 52.3676, lng: 4.9041 },
  { name: "Nepal", lat: 27.7172, lng: 85.3240 },
  { name: "Sri Lanka", lat: 6.9271, lng: 79.8612 },
  { name: "Kerala", lat: 10.8505, lng: 76.2711 },
  { name: "Tamil Nadu", lat: 13.0827, lng: 80.2707 },
  { name: "Delhi", lat: 28.7041, lng: 77.1025 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Madhya Pradesh", lat: 23.2599, lng: 77.4126 },
  { name: "NYC", lat: 40.7128, lng: -74.0060 },
  { name: "Texas", lat: 31.9686, lng: -99.9018 },
  { name: "Brazil", lat: -14.2350, lng: -51.9253 },
  { name: "London, UK", lat: 51.5074, lng: -0.1278 },
  { name: "Cape Town, South Africa", lat: -33.9249, lng: 18.4241 },
  { name: "Auckland, New Zealand", lat: -36.8485, lng: 174.7633 }
];

onMounted(() => {
  const map = L.map('map').setView([20, 0], 2);  // Center the map globally

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(map);

  // Add random markers
  locations.forEach(location => {
    L.marker([location.lat, location.lng])
      .addTo(map)
      .bindPopup(`<strong>${location.name}</strong>`)
      .openPopup();
  });
});
</script>

<style scoped>
#map {
  width: 100%;
  height: 500px;
}
</style>
