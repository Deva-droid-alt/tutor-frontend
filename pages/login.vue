<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
const router = useRouter()
const email = ref('')
const password = ref('')
const error = ref('')

// Define cookie for token
const token = useCookie('token', {
  maxAge: 60 * 60 * 24, // 1 day
  sameSite: 'lax', // recommended for login cookies
  secure: false // set to true in production with HTTPS
})

async function login() {
  try {
    const response = await fetch('http://127.0.0.1:8000/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      error.value = data.detail || data.error || 'Login failed'
      return
    }

    // ✅ Set token in cookie
    token.value = data.token

    alert('Login successful!')
    router.push('/home') // Change if your route is different
  } catch (err) {
    error.value = 'Network error. Please try again.'
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.3s;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  padding: 0.75rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.error {
  margin-top: 1rem;
  color: #d9534f;
  font-weight: bold;
  text-align: center;
}

</style>
