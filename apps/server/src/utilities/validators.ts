export const isValidEmail = (email: string): boolean => {
  return !!email
    .toLocaleLowerCase()
    .match(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
};
export const isStrongPassword = (password: string): boolean => {
  return !!password.match(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
  );
};
