// composables/useAuth.js or inside your login function

export const useAuth = async (tokenValue) => {
  const token = useCookie('token', {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false // must be false if you're accessing via client-side
  });

  token.value = tokenValue; // set the token
};

