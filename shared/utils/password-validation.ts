export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;':",.\/<>?`~]).{8,}$/;

export const PASSWORD_REQUIREMENTS = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: true,
    specialChars: '!@#$%^&*()_+-=[]{}|;:\'",.<>?/`~',
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

export function validatePassword(password: string): PasswordValidationResult {
    const checks = {
        minLength: password.length >= PASSWORD_REQUIREMENTS.minLength,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumber: /\d/.test(password),
        hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{}|;':",.\/<>?`~]/.test(password),
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

export function getPasswordError(password: string): string {
    const result = validatePassword(password);
    return result.errors[0] || '';
}

export function getAllPasswordErrors(password: string): string[] {
    const result = validatePassword(password);
    return result.errors;
}
