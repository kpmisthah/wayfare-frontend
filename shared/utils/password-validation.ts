/**
 * Password Validation Utility
 * Centralized password requirements matching backend validation
 */

// Password complexity regex - must match backend exactly
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const PASSWORD_REQUIREMENTS = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: true,
    specialChars: '@$!%*?&',
};

export interface PasswordValidationResult {
    isValid: boolean;
    errors: string[];
    checks: {
        minLength: boolean;
        hasUppercase: boolean;
        hasLowercase: boolean;
        hasNumber: boolean;
        hasSpecialChar: boolean;
    };
}

/**
 * Validates a password against the complexity requirements
 * @param password - The password to validate
 * @returns PasswordValidationResult with validation status and detailed checks
 */
export function validatePassword(password: string): PasswordValidationResult {
    const checks = {
        minLength: password.length >= PASSWORD_REQUIREMENTS.minLength,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[@$!%*?&]/.test(password),
    };

    const errors: string[] = [];

    if (!checks.minLength) {
        errors.push(`Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters long`);
    }
    if (!checks.hasUppercase) {
        errors.push('Password must include at least one uppercase letter');
    }
    if (!checks.hasLowercase) {
        errors.push('Password must include at least one lowercase letter');
    }
    if (!checks.hasNumber) {
        errors.push('Password must include at least one number');
    }
    if (!checks.hasSpecialChar) {
        errors.push(`Password must include at least one special character (${PASSWORD_REQUIREMENTS.specialChars})`);
    }

    return {
        isValid: errors.length === 0,
        errors,
        checks,
    };
}

/**
 * Get a single error message for the password (first error found)
 * @param password - The password to validate
 * @returns Error message or empty string if valid
 */
export function getPasswordError(password: string): string {
    const result = validatePassword(password);
    return result.errors[0] || '';
}

/**
 * Get all password error messages
 * @param password - The password to validate
 * @returns Array of error messages
 */
export function getAllPasswordErrors(password: string): string[] {
    const result = validatePassword(password);
    return result.errors;
}
