const validatePassword = function(password) {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (password.length < minLength) {
        return { valid: false, message: `Password must be at least ${minLength} characters long.` };
    }
    if (!hasUppercase) {
        return { valid: false, message: 'Password must contain at least one uppercase letter.' };
    }
    if (!hasLowercase) {
        return { valid: false, message: 'Password must contain at least one lowercase letter.' };
    }
    if (!hasNumber) {
        return { valid: false, message: 'Password must contain at least one number.' };
    }
    if (!hasSpecialChar) {
        return { valid: false, message: 'Password must contain at least one special character.' };
    }
    
    return { valid: true, message: 'Password is valid.' };
}
module.exports = {validatePassword}

// Example usage
// const password = "Password123!";
// const result = validatePassword(password);
// console.log(result.message); // Output will depend on the password entered
// console.log(validatePassword("abc"));             // Example 1
// console.log(validatePassword("abcdefgH"));        // Example 2
// console.log(validatePassword("Abcdefgh"));        // Example 3
// console.log(validatePassword("Abcde123"));        // Example 4
// console.log(validatePassword("Abcdef!@#"));       // Example 5
// console.log(validatePassword("Abc123!@#"));       // Example 6
// console.log(validatePassword("Abcdef123!"));      // Example 7
