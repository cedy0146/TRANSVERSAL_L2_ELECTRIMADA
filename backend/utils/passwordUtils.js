/**
 * Utilitaire de validation de mot de passe pour ElectriMada
 * Critères : Majuscule, Minuscule, Chiffre, Caractère spécial, Min 8 caractères.
 */
const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!password || password.length < minLength) 
        return { isValid: false, error: "Le mot de passe doit contenir au moins 8 caractères." };
    if (!hasUpperCase) 
        return { isValid: false, error: "Le mot de passe doit contenir au moins une majuscule." };
    if (!hasLowerCase) 
        return { isValid: false, error: "Le mot de passe doit contenir au moins une minuscule." };
    if (!hasDigit) 
        return { isValid: false, error: "Le mot de passe doit contenir au moins un chiffre." };
    if (!hasSpecialChar) 
        return { isValid: false, error: "Le mot de passe doit contenir au moins un caractère spécial." };

    return { isValid: true };
};

module.exports = { 
  validatePassword
};
