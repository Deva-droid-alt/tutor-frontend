<template>
  <div class="tutor-home">
    <h1>Welcome, Tutor!</h1>

    <section class="profile-edit">
      <h2>Edit Your Profile</h2>
      <form @submit.prevent="submitTutorForm">
        <label>Name</label>
        <input v-model="form.name" type="text" required />

        <label>Subject</label>
        <input v-model="form.subject" type="text" required />

        <label>Location</label>
        <input v-model="form.location" type="text" required />

        <label>Education Level</label>
        <select v-model="form.education_level" required>
          <option disabled value="">Select</option>
          <option>Bachelor's Degree</option>
          <option>Master's Degree</option>
          <option>Doctorate</option>
          <option>BTech/BE</option>
          <option>Higher Secondary</option>
        </select>

        <label>Email</label>
        <input v-model="form.email" type="email" required />

        <label>Phone Number</label>
        <input v-model="form.phone_number" type="text" required />

        <label>Gender</label>
        <select v-model="form.gender" required>
          <option disabled value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <label>Skill Name</label>
        <input v-model="form.skill_name" type="text" required />

        <label>Skill Category</label>
        <select v-model="form.skill_category" required>
          <option disabled value="">Select</option>
          <option>Soft</option>
          <option>Technical</option>
          <option>Communication</option>
          <option>Other</option>
        </select>

        <label>Skill Level</label>
        <select v-model="form.skill_level" required>
          <option disabled value="">Select</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <label>Years of Experience</label>
        <input v-model="form.years_of_experience" type="number" required />

        <label>Degree</label>
        <input v-model="form.degree" type="text" required />

        <label>Major</label>
        <input v-model="form.major" type="text" required />

        <button type="submit">Save Profile</button>
      </form>
    </section>
  </div>
</template>

<script setup>


const form = reactive({
  name: '',
  subject: '',
  location: '',
  education_level: '',
  email: '',
  phone_number: '',
  gender: '',
  skill_name: '',
  skill_category: '',
  skill_level: '',
  years_of_experience: '',
  degree: '',
  major: ''
})

async function submitTutorForm() {
  const token = useCookie('token')  // Works both server and client side
  console.log(token.value)
  // Assume token is stored after login
  if (!token.value) {
    alert('You must be logged in')
    return
  }

  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/tutors/',
      form,
      {
        headers: {
          'Authorization': `Token ${token.value}`,
          'Content-Type': 'application/json'
        }
      }
    )
    alert('Tutor profile created successfully')
  } catch (error) {
    console.error('Error submitting tutor form:', error.response?.data || error)
    alert('Error saving tutor profile')
  }
}
</script>

<style scoped>
.tutor-home {
  max-width: 700px;
  margin: auto;
  padding: 20px;
}
form label {
  font-weight: bold;
  margin-top: 10px;
  display: block;
}
form input,
form select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}
button {
  margin-top: 15px;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background: #2980b9;
}
</style>
