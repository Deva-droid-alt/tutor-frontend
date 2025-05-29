// // stores/auth.js
// import { defineStore } from 'pinia'

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     token: null,
//     user: null
//   }),

//   actions: {
//     setToken(newToken) {
//       this.token = newToken
//     },
//     setUser(userData) {
//       this.user = userData
//     },
//     logout() {
//       this.token = null
//       this.user = null
//     }
//   },

//   persist: true // Optional: persists state in localStorage (requires pinia-plugin-persistedstate)
// })
