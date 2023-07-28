export const logout = async () => {
  await window.Clerk.signOut();
};
export const login = async ({ email, password }) => {
  window.Clerk.openSignIn();
};
