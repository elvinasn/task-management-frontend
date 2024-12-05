export const isValidEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return re.test(email);
};

export const validatePassword = (password: string) => {
  const errors = [];

  if (!/\d/.test(password)) {
    errors.push("Password must include at least one number.");
  }

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }

  if (password.length > 60) {
    errors.push("Password must be no more than 60 characters long.");
  }

  if (/(.)\1\1/.test(password)) {
    errors.push(
      "Password must not contain three repeating characters in a row."
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const errorMessage = {
  email: "Please enter a valid email address.",
  repeatPassword: "Passwords do not match.",
};
