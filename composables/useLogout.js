// ~/composables/useLogout.ts

export const useLogout = () => {
  const token = useCookie('token')
  token.value = null // clears the cookie

  navigateTo('/login') // optional redirect
}
