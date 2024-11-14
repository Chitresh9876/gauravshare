const validateEmail = function (email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

// // Examples
// console.log(validateEmail("test@example.com")); // true
// console.log(validateEmail("user.name+alias@domain.co")); // true
// console.log(validateEmail("user@sub.domain.com")); // true
// console.log(validateEmail("user@domain")); // false
// console.log(validateEmail("user@domain.corporate")); // false

module.exports = { validateEmail };
