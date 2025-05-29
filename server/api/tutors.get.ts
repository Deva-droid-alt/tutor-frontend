// ~/server/api/tutors.get.ts
import { defineEventHandler, getCookie, createError } from 'h3';

export default defineEventHandler((event) => {
  const token = getCookie(event, 'token') // SSR-safe

  if (!token) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  // You can now call external APIs using this token
  return fetch('http://localhost:8000/tutors', {
    headers: {
      Authorization: `Token ${token}`
    }
  }).then(res => res.json())
})
