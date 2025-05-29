<template>
  <div class="admin-dashboard">
    <h1>Admin Dashboard</h1>

    <section>
      <h2>Pending Tutor Verifications</h2>
      <ul>
        <li v-for="t in pendingTutors" :key="t.id">
          <strong>{{ t.name }}</strong> - {{ t.subject }} - {{ t.location }}
          <button @click="approve(t.id)">Approve</button>
          <button @click="reject(t.id)">Reject</button>
        </li>
      </ul>
    </section>

    <section>
      <h2>All Tutors</h2>
      <ul>
        <li v-for="t in allTutors" :key="t.id">
          {{ t.name }} - {{ t.subject }} - {{ t.location }} - Status: {{ t.status }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const pendingTutors = ref([])
const allTutors = ref([])

onMounted(() => {
  // TODO: fetch from API
  pendingTutors.value = [
    { id: 101, name: 'Charlie', subject: 'Biology', location: 'Kerala' },
    { id: 102, name: 'Diana', subject: 'English', location: 'Karnataka' }
  ]

  allTutors.value = [
    { id: 101, name: 'Charlie', subject: 'Biology', location: 'Kerala', status: 'Pending' },
    { id: 102, name: 'Diana', subject: 'English', location: 'Karnataka', status: 'Pending' },
    { id: 103, name: 'Eve', subject: 'History', location: 'Tamil Nadu', status: 'Approved' }
  ]
})

function approve(id) {
  alert(`Approved tutor with ID ${id}`)
  // TODO: API call to approve tutor
  pendingTutors.value = pendingTutors.value.filter(t => t.id !== id)
  const tutor = allTutors.value.find(t => t.id === id)
  if (tutor) tutor.status = 'Approved'
}

function reject(id) {
  alert(`Rejected tutor with ID ${id}`)
  // TODO: API call to reject tutor
  pendingTutors.value = pendingTutors.value.filter(t => t.id !== id)
  const tutor = allTutors.value.find(t => t.id === id)
  if (tutor) tutor.status = 'Rejected'
}
</script>

<style scoped>
.admin-dashboard {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
h1 {
  margin-bottom: 20px;
}
button {
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
}
button:first-of-type {
  background-color: #2ecc71;
  color: white;
  border: none;
}
button:first-of-type:hover {
  background-color: #27ae60;
}
button:last-of-type {
  background-color: #e74c3c;
  color: white;
  border: none;
}
button:last-of-type:hover {
  background-color: #c0392b;
}
</style>
