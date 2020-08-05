function signUpValidator(input) {
  const results = {
    isValid: false,
    error: "",
    fieldError: "",
  };

  if (!input.email) {
    results.error = "Please enter a valid email address.";
    results.fieldError = "email";
    return results;
  }

  if (!input.email.includes("@")) {
    results.error = "Please enter a valid email address.";
    results.fieldError = "email";
    return results;
  }

  if (!input.password) {
    results.error = "Please enter a password.";
    results.fieldError = "password";
    return results;
  }

  if (input.password.length < 6) {
    results.error = "Password needs to include more than 6 characters.";
    results.fieldError = "password";
    return results;
  }

  if (!input.password2) {
    results.error = "Please confirm your password.";
    results.fieldError = "password2";
    return results;
  }

  results.isValid = true;

  return results;
}

export { signUpValidator };
