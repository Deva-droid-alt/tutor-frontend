<template>
  <div class="pg">
    <div class="form-container">
      <h1 class="form-title">Welcome, Tutor!</h1>

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

          <label>Email (auto-filled)</label>
          <input v-model="form.email" type="email" disabled />

          <label>Phone Number</label>
          <input v-model="form.phone_number" type="text" required />

          <label>Gender</label>
          <select v-model="form.gender" required>
            <option disabled value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <label>Skills</label>
          <input v-model="form.skills" type="text" required />

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
          <input v-model="form.years_of_experience" type="number" required min="0" />

          <label>Degree From</label>
          <input v-model="form.degree_from" type="text" required />

          <label>Description</label>
          <textarea v-model="form.description" required></textarea>

          <button type="submit">Save Profile</button>
        </form>
      </section>

      <!-- Floating decorative images -->
      <img
        src="https://img.freepik.com/free-vector/creative-writing-concept-illustration_114360-8167.jpg?semt=ais_hybrid&w=740"
        alt="Decoration"
        class="floating floating-images"
        style="top: -40px; right: -40px; width: 100px;"
      />
    </div>
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
  skills: '',
  skill_category: '',
  skill_level: '',
  years_of_experience: '',
  degree_from: '',
  description: ''
})

const token = localStorage.getItem('token')
const errorMessage = ref(null)
const successMessage = ref(null)

// Prepare useLazyFetch with immediate: false, so it doesn't auto-call
const { data, error, execute } = useLazyFetch('http://127.0.0.1:8000/become-tutor/', {
  method: 'POST',
  headers: {
    'Authorization': `Token ${token}`,
    'Content-Type': 'application/json'
  },
  body: {}, // will set dynamically in execute()
  immediate: false
})

async function submitTutorForm() {
  errorMessage.value = null
  successMessage.value = null

  if (!token) {
    alert('You must be logged in')
    return
  }

  try {
    // Send form data as plain JS object using toRaw
    await execute({
      body: toRaw(form)
    })

    if (error.value) {
      console.error('Error submitting tutor form:', error.value)
      errorMessage.value = JSON.stringify(error.value.data || error.value)
      alert('Error saving tutor profile: ' + errorMessage.value)
      return
    }

    successMessage.value = 'Tutor profile created successfully'
    alert(successMessage.value)
  } catch (err) {
    console.error('Unexpected error:', err)
    alert('Unexpected error saving tutor profile')
  }
}
</script>


<style scoped>
.pg {
  position: relative;
  color: #2c2c54;
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden; /* to contain pseudo element */
}

.pg::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: url('https://img.freepik.com/free-vector/hand-drawn-online-tutor-illustration_23-2150939214.jpg') no-repeat center center/cover;
  opacity: 0.3; /* adjust transparency here */
  z-index: -1;
}


.form-container {
  max-width: 600px;
  width: 100%;
  background-color: #a8a8c5;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  padding: 30px;
  position: relative;
  overflow: hidden;
}

.form-title {
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center;
  color: #2c2c54;
  font-weight: 700;
}

.profile-edit h2 {
  font-size: 24px;
  color: #2c2c54;
  margin-bottom: 20px;
  font-weight: 600;
  text-align: center;
}

label {
  font-weight: 700;
  margin-top: 12px;
  display: block;
  color: #2c2c54;
}

input,
select,
textarea,
button {
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
  font-size: 16px;
  font-family: inherit;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

textarea {
  min-height: 100px;
  resize: vertical;
}

button {
  background-color: #3498db;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  border: none;
  user-select: none;
}

button:hover {
  background-color: #2980b9;
}

.floating-images {
  position: absolute;
  top: -50px;
  right: -50px;
  z-index: -1;
  width: 80px;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style>
