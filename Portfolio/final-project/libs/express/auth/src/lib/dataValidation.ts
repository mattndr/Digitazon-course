export function validateEmail(email) {
  return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
}

export function validatePassword(password) {
  // Min 8 letter password, with at least a symbol, upper and lower case letters and a number
  return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
}

export function validatePhoneNumber(phoneNumber) {
  // Italian phone number
  return /^(([+])39)?((3[1-6][0-9]))(\d{7})$/.test(phoneNumber);
}
