export const resetPasswordTemplate = (token: string) => {
  return `
  Visit this link to reset your password: ${token}
  `;
};
