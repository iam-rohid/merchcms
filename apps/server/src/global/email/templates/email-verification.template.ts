export const emailVerificationTemplate = (token: string) => {
  return `
  Your email veirfication token: ${token}
  `;
};
