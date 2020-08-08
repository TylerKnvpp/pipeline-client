const checkUpdateProfile = (prevData, newData) => {
  const results = {
    isValid: false,
    error: "",
    newDataRequest: {},
    allowSave: false,
  };

  if (
    prevData.username == newData.username &&
    prevData.firstName == newData.firstName &&
    prevData.lastName == newData.lastName &&
    prevData.email == newData.email &&
    prevData.state == newData.state
  ) {
    results.error = "Please update information to save.";
    return results;
  }

  if (newData.username === "") {
    results.error = "Username cannot be blank.";
    return results;
  }

  if (newData.firstName === "") {
    results.error = "First Name cannot be blank.";
    return results;
  }
  if (newData.lastName === "") {
    results.error = "Last name cannot be blank.";
    return results;
  }
  if (newData.email === "") {
    results.error = "Email cannot be blank.";
    return results;
  }

  if (!newData.email.includes("@")) {
    results.error = "Must use a valid email address.";
    return results;
  }

  if (newData.state === "") {
    results.error = "State cannot be blank.";
    return results;
  }

  if (prevData.username != newData.username) {
    results.allowSave = true;
    results.newDataRequest["username"] = newData.username;
  }

  if (prevData.firstName != newData.firstName) {
    results.allowSave = true;
    results.newDataRequest["firstName"] = newData.firstName;
  }

  if (prevData.lastName != newData.lastName) {
    results.allowSave = true;
    results.newDataRequest["lastName"] = newData.lastName;
  }

  if (prevData.email != newData.email) {
    results.allowSave = true;
    results.newDataRequest["email"] = newData.email;
  }

  if (prevData.state != newData.state) {
    results.allowSave = true;
    results.newDataRequest["state"] = newData.state;
  }

  results.isValid = true;
  results.allowSave = true;

  return results;
};

export { checkUpdateProfile };
